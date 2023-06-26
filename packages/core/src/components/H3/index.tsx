import { Typography, TypographyProps } from '@components';

export interface H3Props extends Omit<TypographyProps, 'variant'> {}

export const H3: React.FC<H3Props> = (props) => {
  return <Typography {...props} variant="h3" />;
};
