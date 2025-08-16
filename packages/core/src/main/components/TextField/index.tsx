import {
  TextField as BaseMuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

export const TextField: React.FC<TextFieldProps> = (props) => (
  <BaseMuiTextField {...props} />
);
