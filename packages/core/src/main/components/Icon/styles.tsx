import { IconProps } from '@main/components/Icon';

export const styles = ({
  size,
  color,
  variant,
  ripple,
  bgcolor,
  strokeWidth,
}: Partial<IconProps>) => ({
  width: size,
  height: size,
  get borderRadius() {
    switch (variant) {
      case 'circular':
        return '100%';
      case 'square':
        return undefined;
      default:
        return undefined;
    }
  },
  '& > span > svg': {
    color,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    strokeWidth,
  },
  '& > span::after': ripple
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        backgroundColor: bgcolor,
        content: '""',
      }
    : undefined,
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(4.4)',
      opacity: 0,
    },
  },
});
