import { Typography, TypographyProps } from '@components';

export interface Body2Props extends Omit<TypographyProps, 'variant'> {}

export const Body2: React.FC<Body2Props> = (props) => {
  return <Typography {...props} variant="body2" />;
};
