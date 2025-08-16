import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from '@mui/material';

export type BaseSwitchProps = MuiSwitchProps & {};

export const BaseSwitch: React.FC<BaseSwitchProps> = (props) => (
  <MuiSwitch {...props} />
);
