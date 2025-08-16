import {
  TextField as BaseMuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

export type BaseTextFieldProps = MuiTextFieldProps;

export const BaseTextField: React.FC<BaseTextFieldProps> = (props) => (
  <BaseMuiTextField {...props} />
);
