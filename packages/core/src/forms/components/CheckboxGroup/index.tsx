import { Checkbox } from '@forms/components/Checkbox';
import { Field } from '@forms/lib/Field';
import { FieldProps } from '@forms/interfaces/FieldProps';
import { SelectableOption } from '@forms/interfaces/SelectableOption';
import { Stack, StackProps } from '@main/components/Stack';
import { Box } from '@main/components/Box';
import { InputLabel } from '@main/components/InputLabel';
import { FormHelperText } from '@main/components/FormHelperText';

export type CheckboxGroupProps = FieldProps & {
  direction?: StackProps['direction'];
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  name?: string;
  options?: Array<SelectableOption>;
  onChange?: (event: any) => void;
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  direction = 'column',
  disabled,
  error,
  helperText,
  label,
  name,
  options = [],
  control,
  fieldOptions,
  value,
  ...rest
}) => {
  return (
    <Field
      control={control}
      fieldOptions={fieldOptions}
      as="checkbox-group"
      name={name}
      value={value}
      render={({ props, helpers }) => (
        <Box>
          {label && (
            <InputLabel error={error} disabled={disabled}>
              {label}
            </InputLabel>
          )}
          <Stack direction={direction}>
            {options.map((option, index) => (
              <Checkbox
                key={index}
                label={option.label}
                name={name}
                value={option.value}
                disabled={disabled}
                checked={helpers.isChecked(option.value)}
                onChange={(event) => {
                  props.onChange(event);
                  rest?.onChange?.(event);
                }}
                onBlur={props.onBlur}
                error={helpers.error}
              />
            ))}
          </Stack>
          {helperText && (
            <FormHelperText disabled={disabled}>{helperText}</FormHelperText>
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
