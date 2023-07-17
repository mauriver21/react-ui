import { FieldProps, SelectableOption } from '@interfaces';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as BaseSelect,
  SelectProps as BaseSelectProps,
} from '@reactjs-ui/core';
import { Field } from '@lib';

export type SelectProps = BaseSelectProps &
  FieldProps & {
    options?: Array<SelectableOption>;
    helperText?: string;
  };

export const Select: React.FC<SelectProps> = ({
  fullWidth = true,
  options = [],
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
          <FormControl fullWidth>
            {rest.label && (
              <InputLabel
                id={rest.labelId}
                error={rest.error}
                disabled={rest.disabled}
              >
                {rest.label}
              </InputLabel>
            )}
            <BaseSelect
              fullWidth
              {...rest}
              {...props}
              error={helpers.error}
              onChange={(event, child) => {
                helpers?.onValueChange(event.target.value);
                rest?.onChange?.(event, child);
              }}
            >
              {options.map((option, index) => (
                <MenuItem value={option.value} key={index}>
                  {option.label}
                </MenuItem>
              ))}
            </BaseSelect>
          </FormControl>
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
