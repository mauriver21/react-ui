import { Typography, TypographyProps } from '@components';

export interface H5Props extends Omit<TypographyProps, 'variant'> {}

export const H5: React.FC<H5Props> = (props) => {
  return <Typography {...props} variant="h5" />;
};
