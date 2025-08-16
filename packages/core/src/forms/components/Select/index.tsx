import { FieldProps } from '@forms/interfaces/FieldProps';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@main/components/Select';
import { Field } from '@forms/lib/Field';
import { withDefaultProps } from '@main/hocs/withDefaultProps';
import { Box, BoxProps } from '@main/components/Box';
import { FormControl } from '@main/components/FormControl';
import { InputLabel } from '@main/components/InputLabel';
import { SelectableOption } from '@main/interfaces/SelectableOption';
import { MenuItem } from '@main/components/MenuItem';
import { FormHelperText } from '@main/components/FormHelperText';

export type SelectProps = MuiSelectProps & {
  rootSx?: BoxProps['sx'];
  defaultRootSx?: BoxProps['sx'];
  options?: Array<SelectableOption>;
  helperText?: string;
} & FieldProps;

const BaseSelect = withDefaultProps(
  ({
    rootSx,
    defaultRootSx,
    helperText,
    options = [],
    error,
    fullWidth = true,
    errorMessage,
    ...rest
  }: SelectProps) => {
    const sx = { ...defaultRootSx, ...rootSx };

    return (
      <Box sx={sx}>
        <FormControl fullWidth>
          {rest.label && (
            <InputLabel
              id={rest.labelId}
              error={error}
              disabled={rest.disabled}
            >
              {rest.label}
            </InputLabel>
          )}
          <MuiSelect fullWidth={fullWidth} error={error} {...rest}>
            {options.map((option, index) => (
              <MenuItem value={option.value} key={index}>
                {option.label}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
        {helperText && (
          <FormHelperText disabled={rest.disabled}>{helperText}</FormHelperText>
        )}
        {errorMessage && (
          <FormHelperText error={error}>{errorMessage}</FormHelperText>
        )}
      </Box>
    );
  },
  'Select'
);

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
