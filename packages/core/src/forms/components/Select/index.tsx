import { FieldProps } from '@forms/interfaces/FieldProps';
import {
  Select as BaseSelect,
  SelectProps as BaseSelectProps,
} from 'reactjs-ui-core';
import { Field } from '@forms/lib/Field';

export type SelectProps = BaseSelectProps & FieldProps;

export const Select: React.FC<SelectProps> = ({
  fullWidth = true,
  options = [],
  helperText,
  control,
  fieldOptions,
  rootSx,
  ...rest
}) => {
  return (
    <Field
      as="input"
      fieldOptions={fieldOptions}
      control={control}
      {...rest}
      render={({ props, helpers }) => (
        <BaseSelect
          options={options}
          rootSx={rootSx}
          {...rest}
          {...props}
          errorMessage={helpers.errorMessage}
          error={helpers.error}
          onChange={(event, child) => {
            helpers?.onValueChange(event.target.value);
            rest?.onChange?.(event, child);
          }}
        />
      )}
    />
  );
};
