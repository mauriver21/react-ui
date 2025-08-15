import {
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
} from '@mui/material';

export type FormControlLabelProps = MuiFormControlLabelProps & {};

export const FormControlLabel: React.FC<FormControlLabelProps> = (props) => {
  return <MuiFormControlLabel {...props} />;
};
