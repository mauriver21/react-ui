import { Typography, TypographyProps } from '@components/Typography';

export interface Body1Props extends Omit<TypographyProps, 'variant'> {}

export const Body1: React.FC<Body1Props> = (props) => {
  return <Typography {...props} variant="body1" />;
};
