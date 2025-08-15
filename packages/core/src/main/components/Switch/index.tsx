import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from '@mui/material';

export type SwitchProps = MuiSwitchProps & {};

export const Switch: React.FC<SwitchProps> = (props) => (
  <MuiSwitch {...props} />
);
