import { ButtonProps } from '@components';

export const styles = ({
  sx,
  direction,
  equalSize,
  rounded,
  fullWidth,
}: Partial<ButtonProps>): ButtonProps['sx'] => ({
  ...(fullWidth ? { width: '100%' } : {}),
  ...(direction === 'column'
    ? {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
      }
    : {}),
  ...(equalSize
    ? {
        minWidth: `${equalSize}px`,
        minHeight: `${equalSize}px`,
        width: `${equalSize}px`,
        height: `${equalSize}px`,
        padding: '6px',
      }
    : {}),
  ...(rounded
    ? {
        borderRadius: '100%',
      }
    : {}),
  ...sx,
});
