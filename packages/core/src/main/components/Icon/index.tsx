import { styles } from './styles';
import { Typography, TypographyProps } from '@main/components/Typography';

export interface IconProps extends Omit<TypographyProps, 'variant'> {
  render: React.FC;
  size?: number;
  variant?: 'circular' | 'square';
  ripple?: boolean;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  render: Component,
  sx,
  size = 20,
  color = 'text.secondary',
  variant = 'circular',
  bgcolor,
  ripple,
  strokeWidth = 0,
  boxSizing = 'unset',

  ...rest
}: IconProps) => {
  return (
    <Typography
      component="span"
      sx={{
        boxSizing,
        backgroundColor: bgcolor,
        ...styles({ size, color, variant, ripple, bgcolor, strokeWidth }),
        ...sx,
      }}
      {...rest}
    >
      <Typography
        display="block"
        component="span"
        position="relative"
        width={size}
        height={size}
      >
        <Component />
      </Typography>
    </Typography>
  );
};
