import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

export type TextFieldProps = MuiTextFieldProps & {};

export const TextField: React.FC<TextFieldProps> = (props) => (
  <MuiTextField fullWidth {...props} />
);
