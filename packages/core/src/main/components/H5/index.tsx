import { Typography, TypographyProps } from '@main/components/Typography';

export interface H5Props extends Omit<TypographyProps, 'variant'> {}

export const H5: React.FC<H5Props> = (props) => {
  return <Typography {...props} variant="h5" />;
};
