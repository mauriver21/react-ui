import { withSnackbarProvider } from '@hocs/withSnackbarProvider';
import { OptionsObject, SnackbarKey, useSnackbar } from 'notistack';
import { createContext, useContext } from 'react';

type PrintMessageOptions = Omit<OptionsObject, 'variant'>;

type NotificationsContextType = {
  printMessage: (message: string, options: OptionsObject) => SnackbarKey;
  printSuccessMessage: (
    message: string,
    options?: PrintMessageOptions
  ) => SnackbarKey;
  printInfoMessage: (
    message: string,
    options?: PrintMessageOptions
  ) => SnackbarKey;
  printErrorMessage: (
    message: string,
    options?: PrintMessageOptions
  ) => SnackbarKey;
};

export const NotificationsContext = createContext<NotificationsContextType>(
  {} as any
);
export const useNotifications = () => useContext(NotificationsContext);

export interface NotificationsProviderProps {
  children?: React.ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> =
  withSnackbarProvider(({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const printMessage: NotificationsContextType['printMessage'] = (
      message,
      options
    ) =>
      enqueueSnackbar(message, {
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        ...options,
      });

    const printSuccessMessage: NotificationsContextType['printSuccessMessage'] =
      (message, options) =>
        printMessage(message, { ...options, variant: 'success' });

    const printInfoMessage: NotificationsContextType['printInfoMessage'] = (
      message,
      options
    ) => printMessage(message, { ...options, variant: 'info' });

    const printErrorMessage: NotificationsContextType['printErrorMessage'] = (
      message,
      options
    ) => printMessage(message, { ...options, variant: 'error' });

    return (
      <NotificationsContext.Provider
        value={{
          printMessage,
          printErrorMessage,
          printSuccessMessage,
          printInfoMessage,
        }}
      >
        {children}
      </NotificationsContext.Provider>
    );
  });
