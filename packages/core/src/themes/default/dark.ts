import { ThemeOptions } from '@mui/material/styles';
import './index.css';

export const theme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#222433',
      light: '#2B2C3E',
      dark: '#1E1D2B',
    },
    success: {
      main: '#6AC692',
      light: '#95DEB5',
      dark: '#427C5C',
      contrastText: '#000000',
    },
    warning: {
      main: '#FEBE2C',
      light: '#fcd56a',
      dark: '#cf9906',
      contrastText: '#000000',
    },
    error: {
      main: '#FF626F',
      light: '#FF7984',
      dark: '#B42834',
    },
    info: {
      main: '#00A4FF',
      light: '#43BCFF',
      dark: '#026094',
    },
    background: {
      default: '#1E1D2B',
      paper: '#1E1D2B',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8F9BB0',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    button: {
      textTransform: 'none',
    },
  },
};
