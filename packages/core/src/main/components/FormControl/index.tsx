import { withSkeleton } from '@main/hocs/withSkeleton';
import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
} from '@mui/material';

export type FormControlProps = MuiFormControlProps & {};

export const FormControl: React.FC<FormControlProps> = withSkeleton(
  (props) => {
    return <MuiFormControl {...props} />;
  },
  { fitContent: true }
);
