import { Box, FormHelperText } from '@components';
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

export type TextFieldProps = MuiTextFieldProps & {
  helperText?: string;
  errorMessage?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  helperText,
  errorMessage,
  fullWidth = true,
  ...rest
}) => (
  <Box width={fullWidth ? '100%' : undefined}>
    <MuiTextField fullWidth={fullWidth} {...rest} />
    {helperText && (
      <FormHelperText disabled={rest.disabled}>{helperText}</FormHelperText>
    )}
    {errorMessage && (
      <FormHelperText error={rest.error}>{errorMessage}</FormHelperText>
    )}
  </Box>
);
