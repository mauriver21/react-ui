import { Typography, TypographyProps } from '@components/Typography';

export interface H2Props extends Omit<TypographyProps, 'variant'> {}

export const H2: React.FC<H2Props> = (props) => {
  return <Typography {...props} variant="h2" />;
};
