import { ThemeProvider } from '@components';

export const withThemeProvider = <T,>(Component: React.FC<T>) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    return (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    );
  };
};
