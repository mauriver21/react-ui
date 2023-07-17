import {
  Box,
  Checkbox as BaseCheckbox,
  CheckboxProps as BaseCheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@reactjs-ui/core';
import { Field } from '@lib';
import { FieldProps } from '@interfaces';

export type CheckboxProps = BaseCheckboxProps &
  FieldProps & {
    helperText?: string;
    label?: string;
    uncheckedValue?: any;
  };

export const Checkbox: React.FC<CheckboxProps> = ({
  helperText,
  label,
  control,
  fieldOptions,
  uncheckedValue,
  onChange,
  ...rest
}) => {
  return (
    <Field
      as="checkbox"
      control={control}
      fieldOptions={fieldOptions}
      uncheckedValue={uncheckedValue}
      {...rest}
      render={({ props, helpers }) => (
        <Box>
          <FormControlLabel
            control={
              <BaseCheckbox
                {...rest}
                {...props}
                checked={props.checked}
                value={rest.value}
                onChange={(event, checked) => {
                  props.onChange(event);
                  onChange?.(event, checked);
                }}
              />
            }
            label={label}
          />
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
