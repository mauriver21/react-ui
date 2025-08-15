import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from 'reactjs-ui-core';
import { Field } from '@forms/lib/Field';
import { FieldProps } from '@forms/interfaces';

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
        <MuiTextField
          fullWidth
          {...rest}
          {...props}
          error={helpers.error}
          errorMessage={helpers.errorMessage}
        />
      )}
    />
  );
};
