import { Typography, TypographyProps } from '@components/Typography';

export interface H1Props extends Omit<TypographyProps, 'variant'> {}

export const H1: React.FC<H1Props> = (props) => {
  return <Typography {...props} variant="h1" />;
};
