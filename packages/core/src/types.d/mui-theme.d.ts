import { SelectProps, TextFieldProps, TimePickerProps } from '@components';

interface PaletteScales {
  '100'?: string;
  '200'?: string;
  '300'?: string;
  '400'?: string;
  '500'?: string;
  '600'?: string;
  '700'?: string;
}

declare module '@mui/material/styles' {
  interface PaletteColor extends PaletteScales {}

  interface Theme {
    customComponents: {
      TextField?: {
        defaultProps?: Partial<TextFieldProps>;
      };
      Select?: {
        defaultProps?: Partial<SelectProps>;
      };
      TimePicker?: {
        defaultProps?: Partial<TimePickerProps>;
      };
    };
  }

  interface ThemeOptions {
    customComponents?: Theme['customComponents'];
  }
}
