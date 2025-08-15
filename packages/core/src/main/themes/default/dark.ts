import { PaletteColor, ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowY: 'hidden',
        },
        'html, body, div': {
          '& ::-webkit-scrollbar': {
            width: '7px',
          },
          '& ::-webkit-scrollbar-track': {
            WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '& ::-webkit-scrollbar-thumb': {
            get backgroundColor() {
              return (theme.palette?.primary as PaletteColor)?.['200'];
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              get borderColor() {
                return (theme.palette?.primary as PaletteColor).main;
              },
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              get borderColor() {
                return (theme.palette?.primary as PaletteColor).light;
              },
            },
            '&:hover fieldset': {
              borderWidth: '1px',
              get borderColor() {
                return (theme.palette?.primary as PaletteColor).light;
              },
            },
          },
        },
      },
    },
  },
  customComponents: {
    Select: {
      defaultProps: {
        defaultRootSx: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
          },
          '.MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: (theme) => {
                return theme.palette.primary.main;
              },
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: (theme) => {
                return theme.palette.primary.light;
              },
            },
            '&:hover fieldset': {
              borderWidth: '1px',
              borderColor: (theme) => {
                return theme.palette.primary.main;
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
      '100': '#36356C',
      '200': '#515381',
      '300': '#6C6D99',
      '400': '#8688AE',
      '500': '#A3A5C3',
      '600': '#BDBECF',
      '700': '#D6D7E2',
    },
    secondary: {
      main: '#222433',
      light: '#2B2C3E',
      dark: '#1E1D2B',
      '100': '#000000',
      '200': '#080a19',
      '300': '#131531',
      '400': '#1c1e49',
      '500': '#252561',
      '600': '#2e2f78',
      '700': '#373891',
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
