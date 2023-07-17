import {
  Box,
  FormHelperText,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@reactjs-ui/core';
import { Field } from '@lib';
import { FieldProps } from '@interfaces';

export type TextFieldProps = MuiTextFieldProps & FieldProps & {};

export const TextField: React.FC<TextFieldProps> = ({
  fullWidth = true,
  helperText,
  control,
  fieldOptions,
  ...rest
}) => {
  return (
    <Field
      as="input"
      fieldOptions={fieldOptions}
      control={control}
      {...rest}
      render={({ props, helpers }) => (
        <Box>
          <MuiTextField fullWidth {...rest} {...props} error={helpers.error} />
          {helperText && (
            <FormHelperText disabled={rest.disabled}>
              {helperText}
            </FormHelperText>
          )}
          {helpers.errorMessage && (
            <FormHelperText error={helpers.error}>
              {helpers.errorMessage}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};
