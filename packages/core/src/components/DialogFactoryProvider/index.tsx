import { Body2, Button, Dialog, DialogProps, Stack } from '@components';
import { sleep } from '@utils';
import React, { useRef } from 'react';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { NavigateFunction, Params } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

type Dialogs = Array<{
  id: string;
  props: DialogProps;
  Component: React.FC<DialogProps>;
}>;

type DialogContextType = {
  config: (options: Partial<DialogProps>) => void;
  close: (options?: { afterClose?: () => void }) => void;
  navigate?: NavigateFunction | undefined;
  urlParams?: Readonly<Params<string>> | undefined;
};

export interface DialogProviderProps {
  children?: ReactNode;
  debug?: boolean;
}

export const DialogFactoryContext = createContext<{
  createDialog: (args: {
    options?: Omit<DialogProps, 'open'>;
    template: ReactNode;
    navigate?: NavigateFunction;
    urlParams?: Readonly<Params<string>>;
  }) => {
    id: string;
    close: () => void;
  };
  confirmDialog: (args?: {
    options?: DialogProps;
    template?: ReactNode;
    navigate?: NavigateFunction;
    message?: string;
    acceptText?: string;
    cancelText?: string;
  }) => Promise<true | void>;
}>({} as any);

export const useDialogFactoryContext = () => useContext(DialogFactoryContext);

export const DialogContext = createContext<DialogContextType | null>(null);
export const useDialog = () => useContext(DialogContext);

/**
 * Provider for handling all the application dialogs.
 */
export const DialogFactoryProvider: React.FC<DialogProviderProps> = ({
  children,
  debug,
}) => {
  const [render, setRender] = useState('');
  const store = useRef<{
    dialogs: Dialogs;
  }>({ dialogs: [] });

  const setDialogs = (dialogs: Dialogs) => {
    store.current.dialogs = dialogs;
    setRender(uuid());
  };

  const confirmDialog = (args?: {
    options?: Omit<DialogProps, 'open'>;
    template?: ReactNode;
    navigate?: NavigateFunction;
    message?: string;
    acceptText?: string;
    cancelText?: string;
  }) => {
    return new Promise<true | void>((resolve) => {
      const ConfirmActions: React.FC = () => {
        const dialog = useDialog();

        return (
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={() => dialog?.close?.()}>
              {args?.cancelText || 'Cancel'}
            </Button>
            <Button
              autoFocus
              disableFocusRipple
              onClick={() => {
                dialog?.close?.();
                resolve(true);
              }}
            >
              {args?.acceptText || 'Accept'}
            </Button>
          </Stack>
        );
      };
      const Component: React.FC = () => {
        if (args?.template) {
          return (
            <>
              {args?.template}
              <ConfirmActions />
            </>
          );
        } else {
          return (
            <Stack spacing={2} p={2}>
              <Body2>
                {args?.message || 'Do you want to confirm this operation?'}
              </Body2>
              <ConfirmActions />
            </Stack>
          );
        }
      };

      createDialog({
        options: {
          ...args?.options,
          maxWidth: 'sm',
          PaperProps: {
            sx: { backgroundColor: 'primary.dark', backgroundImage: 'none' },
          },
        },
        navigate: args?.navigate,
        template: <Component />,
      });
    });
  };

  /**
   * Create a new dialog.
   */
  const createDialog = (args: {
    options?: Omit<DialogProps, 'open'>;
    template: ReactNode;
    navigate?: NavigateFunction;
    urlParams?: Readonly<Params<string>>;
  }) => {
    const id = uuid();

    const onClose: DialogProps['onClose'] = async (event, reason) => {
      await args.options?.onClose?.(event, reason);
      removeDialog(id);
    };

    const defaultProps: Partial<DialogProps> = {
      maxWidth: 'md',
      fullWidth: true,
      ...args?.options,
      PaperProps: {
        ...args.options?.PaperProps,
        sx: {
          backgroundColor: 'primary.dark',
          backgroundImage: 'none',
          ...args.options?.PaperProps?.sx,
        },
      },
    };

    const overriddenBaseProps: DialogProps = {
      open: true,
      onClose,
    };
    const dialogProps = {
      ...defaultProps,
      ...args.options,
      ...overriddenBaseProps,
    };

    const config: DialogContextType['config'] = (options) => {
      const onClose: DialogProps['onClose'] = async (event, reason) => {
        await options?.onClose?.(event, reason);
        removeDialog(id);
      };
      const overriddenProps = {
        ...overriddenBaseProps,
        onClose,
      };
      console.log('Dialog options', options);
      updateDialog(id, { ...defaultProps, ...options, ...overriddenProps });
    };

    const close: DialogContextType['close'] = (options) => {
      removeDialog(id, options);
    };

    const DialogComponent: React.FC<DialogProps> = (props) => {
      return (
        <DialogContext.Provider
          value={{
            config,
            close,
            navigate: args.navigate,
            urlParams: args.urlParams,
          }}
        >
          <Dialog {...props}>{args.template}</Dialog>
        </DialogContext.Provider>
      );
    };

    setDialogs([
      ...store.current.dialogs,
      {
        id,
        props: dialogProps,
        Component: DialogComponent,
      },
    ]);

    return {
      id,
      render,
      close,
    };
  };

  /**
   * Update the dialog props.
   */
  const updateDialog = async (id: string, options: DialogProps) => {
    setDialogs(
      store.current.dialogs.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            props: { ...item.props, ...options },
          };
        }
        return item;
      })
    );
  };

  /**
   * Remove and unmount a dialog from the DOM.
   */
  const removeDialog = async (
    id: string,
    options?: { afterClose?: () => void }
  ) => {
    updateDialog(id, { open: false });
    await sleep(200);
    options?.afterClose?.();
    setDialogs(store.current.dialogs.filter((item) => item.id != id));
  };

  useEffect(() => {
    debug && console.log(store.current.dialogs);
  }, [render]);

  useEffect(() => {
    return () => setDialogs([]);
  }, []);

  return (
    <DialogFactoryContext.Provider value={{ createDialog, confirmDialog }}>
      {children}
      {store.current.dialogs.map((item) => (
        <React.Fragment key={item.id}>
          {item.Component(item.props)}
        </React.Fragment>
      ))}
    </DialogFactoryContext.Provider>
  );
};
