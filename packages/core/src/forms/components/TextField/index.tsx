import { Field } from '@forms/lib/Field';
import { FieldProps } from '@forms/interfaces/FieldProps';
import { FormHelperText } from '@main/components/FormHelperText';
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@main/components/TextField';
import { Box } from '@main/components/Box';
import { withSkeleton } from '@main/hocs/withSkeleton';

const BaseTextField = withSkeleton(MuiTextField, { fitContent: true });

export type TextFieldProps = MuiTextFieldProps & FieldProps & {};

export const TextField: React.FC<TextFieldProps> = ({
  fullWidth = true,
  helperText,
  control,
  fieldOptions,
  onInput,
  onBlur,
  ...rest
}) => {
  return (
    <Field
      as="input"
      fieldOptions={fieldOptions}
      control={control}
      onInput={onInput}
      onBlur={onBlur}
      {...rest}
      render={({ props, helpers }) => (
        <Box width={fullWidth ? '100%' : undefined}>
          <BaseTextField fullWidth={fullWidth} {...props} {...rest} />
          {helperText && (
            <FormHelperText disabled={rest.disabled}>
              {helperText}
            </FormHelperText>
          )}
          {helpers.errorMessage && (
            <FormHelperText error={rest.error}>
              {helpers.errorMessage}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};
