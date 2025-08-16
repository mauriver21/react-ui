import { BoxProps } from '@mui/material';
import { SelectProps } from '@components/Select';
import { TextFieldProps } from '@components/TextField';
import { TimePickerProps } from '@components/TimePickerProps';

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
        defaultProps?: Partial<{
          rootSx: BoxProps['sx'];
          defaultRootSx: BoxProps['sx'];
        }>;
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
