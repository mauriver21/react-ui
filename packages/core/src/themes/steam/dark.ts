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
        rootSx: {
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
      main: '#66C0F4', // Color principal basado en el azul de Steam
      light: '#8ED4F9', // Azul claro
      dark: '#4C93BF', // Azul oscuro
      '100': '#1B2838', // Fondo oscuro típico de Steam
      '200': '#2A475E', // Fondo intermedio
      '300': '#324759', // Detalles
      '400': '#3B5873', // Variaciones
      '500': '#66C0F4', // Azul principal
      '600': '#99D6FA', // Azul más claro
      '700': '#C3E7FF', // Azul muy claro
    },
    secondary: {
      main: '#1B2838', // Fondo principal de la plataforma
      light: '#223344', // Gris oscuro
      dark: '#0D1A25', // Gris más oscuro
      '100': '#101820', // Colores profundos oscuros
      '200': '#162027', // Colores oscuros intermedios
      '300': '#1F2D3A', // Colores de detalle oscuro
      '400': '#253646', // Colores oscuros de fondo
      '500': '#1B2838', // Fondo principal
      '600': '#2B3B4A', // Fondo intermedio
      '700': '#3A4D5D', // Fondo claro
    },
    success: {
      main: '#5CDB95', // Verde claro para estados de éxito
      light: '#8DE6B5',
      dark: '#44A367',
      contrastText: '#000000',
    },
    warning: {
      main: '#FFD700', // Amarillo dorado para advertencias
      light: '#FFDF70',
      dark: '#C6A300',
      contrastText: '#000000',
    },
    error: {
      main: '#E74C3C', // Rojo Steam para errores
      light: '#EF6F60',
      dark: '#A03524',
    },
    info: {
      main: '#1ABC9C', // Verde azulado para información
      light: '#48C9B0',
      dark: '#168B77',
    },
    background: {
      default: '#101820', // Fondo oscuro de la interfaz
      paper: '#162027', // Color de fondo más claro
    },
    text: {
      primary: '#C7D5E0', // Texto principal claro
      secondary: '#8F9BB3', // Texto secundario gris claro
    },
  },
  typography: {
    fontFamily: 'Motiva Sans',
    button: {
      textTransform: 'none',
    },
  },
};
