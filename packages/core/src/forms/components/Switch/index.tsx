import { BaseSwitch, BaseSwitchProps } from '@main/components/BaseSwitch';
import { Field } from '@forms/lib/Field';
import { FieldProps } from '@forms/interfaces/FieldProps';
import { Box } from '@main/components/Box';
import { FormControlLabel } from '@main/components/FormControlLabel';
import { FormHelperText } from '@main/components/FormHelperText';

export type SwitchProps = BaseSwitchProps &
  FieldProps & {
    helperText?: string;
    label?: string;
    uncheckedValue?: any;
  };

export const Switch: React.FC<SwitchProps> = ({
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
              <BaseSwitch
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
