import { Typography, TypographyProps } from '@components/Typography';

export interface H6Props extends Omit<TypographyProps, 'variant'> {}

export const H6: React.FC<H6Props> = (props) => {
  return <Typography {...props} variant="h6" />;
};
