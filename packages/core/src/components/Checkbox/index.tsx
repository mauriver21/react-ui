import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material';

export type CheckboxProps = MuiCheckboxProps & {};

export const Checkbox: React.FC<CheckboxProps> = (props) => (
  <MuiCheckbox {...props} />
);
