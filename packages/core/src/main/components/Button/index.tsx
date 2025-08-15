import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { styles } from './styles';
import { withSkeleton } from '@main/hocs/withSkeleton';
import { withTooltip, WithTooltipProps } from '@main/hocs/withTooltip';

export interface ButtonProps extends MuiButtonProps, WithTooltipProps {
  direction?: 'row' | 'column';
  equalSize?: number;
  rounded?: boolean;
  index?: number;
}

export const Button: React.FC<ButtonProps> = withTooltip(
  withSkeleton(
    ({
      color = 'primary',
      variant = 'contained',
      disableElevation = true,
      direction,
      sx,
      equalSize,
      rounded,
      title,
      fullWidth,
      index: _,
      ...rest
    }) => (
      <MuiButton
        color={color}
        variant={variant}
        disableElevation={disableElevation}
        fullWidth={fullWidth}
        sx={styles({ sx, direction, equalSize, rounded, fullWidth })}
        {...rest}
      />
    ),
    { fitContent: true }
  )
);
