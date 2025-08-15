import { ButtonProps } from '@main/components/Button';

export const styles = ({
  sx,
  direction,
  equalSize,
  rounded,
}: Partial<ButtonProps>): ButtonProps['sx'] => {
  return {
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
  };
};
