import { Typography, TypographyProps } from '@components/Typography';

export interface H4Props extends Omit<TypographyProps, 'variant'> {}

export const H4: React.FC<H4Props> = (props) => {
  return <Typography {...props} variant="h4" />;
};
