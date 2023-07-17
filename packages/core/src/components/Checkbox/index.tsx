import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material';

export interface CheckboxProps extends MuiCheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = (props) => (
  <MuiCheckbox {...props} />
);
