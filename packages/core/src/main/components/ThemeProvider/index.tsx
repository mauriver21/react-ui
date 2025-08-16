import { createContext, useContext, useEffect, useState } from 'react';
import {
  CssBaseline,
  Theme,
  createTheme,
  ThemeProviderProps as MuiThemeProviderProps,
} from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeName } from '@main/interfaces/ThemeName';
import * as themes from '@main/themes/index';
import { v4 as uuid } from 'uuid';

const THEME_ID = uuid();

export type ComponentName = keyof Theme['customComponents'];
export interface ThemeProviderProps
  extends Omit<MuiThemeProviderProps, 'theme'> {
  theme?: Theme;
  themeName?: ThemeName;
}

const getComponentDefaultProps = (
  componentName: ComponentName,
  theme?: Theme
) => theme?.customComponents?.[componentName]?.defaultProps;

export const ThemeContext = createContext<{
  changeTheme: (themeName: ThemeName) => void;
  getComponentDefaultProps: typeof getComponentDefaultProps;
}>({
  changeTheme: (themeName) => {
    themeName;
  },
  getComponentDefaultProps,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themeName = 'defaultDark',
  ...rest
}) => {
  const [theme, setTheme] = useState(createTheme(themes[themeName]));

  const loadStyles = async (themeName: ThemeName) => {
    const cssPath = `../../themes/${themeName.replace(
      /(Light|Dark)/,
      ''
    )}/index.css`;
    const url = new URL(cssPath, import.meta.url).href;
    const link =
      (document.getElementById(THEME_ID) as HTMLLinkElement) ||
      document.createElement('link');
    link.id = THEME_ID;
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  };

  const changeTheme = (themeName: ThemeName) => {
    loadStyles(themeName);
    setTheme(createTheme(themes[themeName]));
  };

  const _getComponentDefaultProps = (componentName: ComponentName) =>
    getComponentDefaultProps(componentName, theme);

  useEffect(() => {
    loadStyles(themeName);
  }, [themeName]);

  useEffect(() => {
    rest.theme && setTheme(createTheme(rest.theme));
  }, [rest.theme]);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        getComponentDefaultProps: _getComponentDefaultProps,
      }}
    >
      <MuiThemeProvider {...rest} theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
