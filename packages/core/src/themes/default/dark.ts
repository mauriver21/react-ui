import { PaletteColor, ThemeOptions } from '@mui/material/styles';
import './index.css';

export const theme: ThemeOptions = {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 18,
            '& fieldset': {
              get borderColor() {
                return (theme.palette?.primary as PaletteColor).main;
              },
            },
            '&.Mui-focused fieldset': {
              get borderColor() {
                return (theme.palette?.primary as PaletteColor).light;
              },
            },
            '&:hover fieldset': {
              get borderColor() {
                return (theme.palette?.primary as PaletteColor).light;
              },
            },
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#8688AE',
      light: '#b6b9e6',
      dark: '#585976',
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
