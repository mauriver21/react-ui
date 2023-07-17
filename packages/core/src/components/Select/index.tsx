import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';

export type SelectProps = MuiSelectProps & {};

export const Select: React.FC<SelectProps> = (props) => (
  <MuiSelect {...props} />
);
