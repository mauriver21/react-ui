import { SelectProps, TextFieldProps, TimePickerProps } from '@components';

declare module '@mui/material/styles' {
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
