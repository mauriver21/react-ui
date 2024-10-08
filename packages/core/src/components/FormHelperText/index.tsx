import { withSkeleton } from '@hocs';
import {
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
} from '@mui/material';

export type FormHelperTextProps = MuiFormHelperTextProps & {};

export const FormHelperText: React.FC<FormHelperTextProps> = withSkeleton(
  (props) => {
    return <MuiFormHelperText {...props} />;
  }
);
