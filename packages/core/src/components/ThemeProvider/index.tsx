import { createContext, useContext, useEffect, useState } from 'react';
import { CssBaseline, Theme, createTheme } from '@mui/material';
import { ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeName } from '@interfaces';
import * as themes from '@themes';

export interface ThemeProviderProps
  extends Omit<MuiThemeProviderProps, 'theme'> {
  theme?: Theme;
}

export const ThemeContext = createContext<{
  changeTheme: (themeName: ThemeName) => void;
}>({
  changeTheme: (themeName) => {
    themeName;
  },
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...rest
}) => {
  const [theme, setTheme] = useState(createTheme(themes['defaultDark']));

  const changeTheme = (themeName: ThemeName) => {
    setTheme(createTheme(themes[themeName]));
  };

  useEffect(() => {
    rest.theme && setTheme(createTheme(rest.theme));
  }, [rest.theme]);

  return (
    <ThemeContext.Provider value={{ changeTheme }}>
      <MuiThemeProvider {...rest} theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
