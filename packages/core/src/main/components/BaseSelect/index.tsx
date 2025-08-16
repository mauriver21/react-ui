import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';

export type BaseSelectProps = MuiSelectProps;

export const BaseSelect: React.FC<BaseSelectProps> = (props) => (
  <MuiSelect {...props} />
);
