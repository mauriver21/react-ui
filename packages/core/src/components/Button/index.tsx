import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { styles } from './styles';
import { withSkeleton, withTooltip, WithTooltipProps } from '@hocs';
import { useCallback } from 'react';

export interface ButtonProps extends MuiButtonProps, WithTooltipProps {
  direction?: 'row' | 'column';
  equalSize?: number;
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const Component = useCallback(
    withTooltip(
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
          ...rest
        }: ButtonProps) => (
          <MuiButton
            color={color}
            variant={variant}
            disableElevation={disableElevation}
            sx={styles({ sx, direction, equalSize, rounded, fullWidth })}
            {...rest}
          />
        ),
        { fitContent: true }
      )
    ),
    []
  );

  return <Component {...props} />;
};
