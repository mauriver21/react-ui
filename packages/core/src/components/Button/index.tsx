import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

export interface ButtonProps extends MuiButtonProps {}

export const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton color="primary" variant="contained" {...props} />;
};
