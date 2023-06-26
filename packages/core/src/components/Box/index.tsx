import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

export interface BoxProps extends MuiBoxProps {}

export const Box: React.FC<BoxProps> = (props) => <MuiBox {...props} />;
