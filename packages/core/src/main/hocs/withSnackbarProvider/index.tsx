import { SnackbarAction, SnackbarProvider } from 'notistack';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export const SnackbarConfigContext = createContext<{
  setConfig: Dispatch<
    SetStateAction<
      | {
          action: SnackbarAction;
        }
      | undefined
    >
  >;
}>({} as any);

export const useSnackbarConfig = () => useContext(SnackbarConfigContext);

export const withSnackbarProvider = <T,>(Component: React.FC<T>) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    const [config, setConfig] = useState<{ action: SnackbarAction }>();

    return (
      <SnackbarConfigContext.Provider value={{ setConfig }}>
        <SnackbarProvider action={config?.action} maxSnack={3}>
          <Component {...props} />
        </SnackbarProvider>
      </SnackbarConfigContext.Provider>
    );
  };
};
