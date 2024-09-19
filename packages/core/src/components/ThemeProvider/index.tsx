import { createContext, useContext, useEffect, useState } from 'react';
import { CssBaseline, Theme, createTheme } from '@mui/material';
import { ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeName } from '@interfaces';
import { Style } from '@components';
import * as themes from '@themes';

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
  const [themeCss, setThemeCss] = useState('');

  const loadStyles = async (themeName: ThemeName) => {
    const css = (
      await import(
        `../../themes/${themeName.replace(/(Light|Dark)/, '')}/index.css`
      )
    ).default;
    setThemeCss(css);
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
        <Style id="theme-style" css={themeCss} />
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
