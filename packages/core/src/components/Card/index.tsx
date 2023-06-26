import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends MuiCardProps {}

export const Card: React.FC<CardProps> = (props) => <MuiCard {...props} />;
