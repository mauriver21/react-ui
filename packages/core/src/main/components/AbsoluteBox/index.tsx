import { Box, BoxProps } from '@main/components/Box';

export interface AbsoluteBoxProps extends Omit<BoxProps, 'position'> {}

export const AbsoluteBox: React.FC<AbsoluteBoxProps> = ({
  width = '100%',
  height = '100%',
  top = 0,
  left = 0,
  ...rest
}) => (
  <Box
    position="absolute"
    width={width}
    height={height}
    top={0}
    left={0}
    {...rest}
  />
);
