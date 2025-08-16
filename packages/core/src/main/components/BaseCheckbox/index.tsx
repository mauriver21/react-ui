import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material';

export interface BaseCheckboxProps extends MuiCheckboxProps {}

export const BaseCheckbox: React.FC<BaseCheckboxProps> = (props) => (
  <MuiCheckbox {...props} />
);
