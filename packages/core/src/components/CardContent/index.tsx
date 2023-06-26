import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps,
} from '@mui/material';

export interface CardContentProps extends MuiCardContentProps {}

export const CardContent: React.FC<CardContentProps> = (props) => (
  <MuiCardContent {...props} />
);
