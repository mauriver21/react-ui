import { Typography, TypographyProps } from '@main/components/Typography';

export interface H1Props extends Omit<TypographyProps, 'variant'> {}

export const H1: React.FC<H1Props> = (props) => {
  return <Typography {...props} variant="h1" />;
};
