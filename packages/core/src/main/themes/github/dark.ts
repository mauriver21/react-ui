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
    mode: 'dark',
    primary: {
      main: '#58A6FF', // Azul principal de GitHub
      light: '#79B8FF', // Azul claro
      dark: '#1F6FEB', // Azul más profundo
      '100': '#0D1117', // Fondo oscuro principal
      '200': '#161B22', // Fondo intermedio oscuro
      '300': '#21262D', // Fondo para secciones destacadas
      '400': '#30363D', // Bordes o elementos secundarios
      '500': '#58A6FF', // Azul destacado
      '600': '#79B8FF', // Azul más brillante
      '700': '#A2CBFF', // Azul muy claro
    },
    secondary: {
      main: '#1C2128', // Fondo intermedio
      light: '#2D333B', // Fondo claro
      dark: '#0D1117', // Fondo más oscuro
      '100': '#0D1117', // Fondo base
      '200': '#161B22', // Fondo intermedio
      '300': '#21262D', // Fondo de detalle
      '400': '#30363D', // Bordes claros
      '500': '#1C2128', // Fondo destacado
      '600': '#2D333B', // Fondo claro
      '700': '#3A4048', // Tonalidades intermedias
    },
    success: {
      main: '#3FB950', // Verde para acciones exitosas
      light: '#56D36E',
      dark: '#2A8036',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F0B429', // Amarillo para advertencias
      light: '#FFD764',
      dark: '#B3811E',
      contrastText: '#000000',
    },
    error: {
      main: '#F85149', // Rojo GitHub para errores
      light: '#FA726F',
      dark: '#C32E31',
    },
    info: {
      main: '#58A6FF', // Azul para información
      light: '#79B8FF',
      dark: '#1F6FEB',
    },
    background: {
      default: '#0D1117', // Fondo principal oscuro
      paper: '#161B22', // Fondo para contenedores
    },
    text: {
      primary: '#C9D1D9', // Texto principal claro
      secondary: '#8B949E', // Texto secundario grisáceo
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif', // Fuente moderna y versátil
    button: {
      textTransform: 'none',
    },
  },
};
