import { Field } from '@forms/lib/Field';
import { FieldProps } from '@forms/interfaces/FieldProps';
import { FormHelperText } from '@main/components/FormHelperText';
import {
  BaseTextField as BaseMuiTextField,
  BaseTextFieldProps as BaseMuiTextFieldProps,
} from '@main/components/BaseTextField';
import { Box } from '@main/components/Box';
import { withSkeleton } from '@main/hocs/withSkeleton';

const BaseTextField = withSkeleton(BaseMuiTextField, { fitContent: true });

export type TextFieldProps = BaseMuiTextFieldProps & FieldProps & {};

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
            <FormHelperText error={helpers.error}>
              {helpers.errorMessage}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};
