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
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': {
            get backgroundColor() {
              return theme.palette?.background?.paper;
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
    mode: 'light',
    primary: {
      main: '#0969DA', // Azul principal de GitHub
      light: '#2188FF', // Azul más claro
      dark: '#0550AE', // Azul más profundo
      '100': '#E8F0FE', // Azul muy claro para fondos
      '200': '#D0E2FD', // Fondo claro intermedio
      '300': '#AFCFFA', // Fondo destacado
      '400': '#6BA9F7', // Tonos de bordes y elementos activos
      '500': '#0969DA', // Azul principal
      '600': '#2188FF', // Azul brillante
      '700': '#54A4FF', // Azul muy claro
    },
    secondary: {
      main: '#F6F8FA', // Fondo principal claro
      light: '#FFFFFF', // Fondo blanco
      dark: '#E1E4E8', // Gris claro para bordes
      '100': '#FFFFFF', // Blanco puro
      '200': '#F6F8FA', // Fondo general
      '300': '#EDEFF2', // Fondos secundarios
      '400': '#D1D5DA', // Gris para detalles
      '500': '#E1E4E8', // Bordes o secciones
      '600': '#C9CCD1', // Gris más oscuro
      '700': '#A9ADB2', // Gris oscuro
    },
    success: {
      main: '#2DA44E', // Verde para acciones exitosas
      light: '#57D877',
      dark: '#1B7B3A',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#DBAB09', // Amarillo para advertencias
      light: '#F2CC60',
      dark: '#9F7A07',
      contrastText: '#000000',
    },
    error: {
      main: '#D73A49', // Rojo de GitHub para errores
      light: '#E77885',
      dark: '#A1202E',
    },
    info: {
      main: '#0969DA', // Azul para información
      light: '#2188FF',
      dark: '#0550AE',
    },
    background: {
      default: '#FFFFFF', // Fondo principal blanco
      paper: '#F6F8FA', // Fondo para tarjetas o contenedores
    },
    text: {
      primary: '#24292F', // Texto principal negro/gris oscuro
      secondary: '#57606A', // Texto secundario gris
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif', // Fuente moderna y versátil
    button: {
      textTransform: 'none',
    },
  },
};
