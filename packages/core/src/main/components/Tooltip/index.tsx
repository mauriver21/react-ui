import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from '@mui/material';

export interface TooltipProps extends MuiTooltipProps {}

export const Tooltip: React.FC<TooltipProps> = (props) => (
  <MuiTooltip {...props} />
);
