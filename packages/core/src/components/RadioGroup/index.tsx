import { Radio, RadioGroup as MuiRadioGroup } from '@mui/material';
import {
  InputLabel,
  FormControlLabel,
  FormHelperText,
  Stack,
  StackProps,
  Box,
  Field,
} from '@components';
import { FieldProps, SelectableOption } from '@interfaces';

export type RadioGroupProps = FieldProps & {
  id?: string;
  direction?: StackProps['direction'];
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  name?: string;
  options?: Array<SelectableOption>;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  direction = 'column',
  disabled,
  helperText,
  label,
  options = [],
  control,
  fieldOptions,
  ...rest
}) => {
  return (
    <Field
      as="radio-group"
      control={control}
      fieldOptions={fieldOptions}
      {...rest}
      render={({ props, helpers }) => (
        <Box id={id}>
          {label && (
            <InputLabel error={helpers.error} disabled={disabled}>
              {label}
            </InputLabel>
          )}
          <Stack direction={direction}>
            {options.map((option, index) => (
              <FormControlLabel
                style={{ alignSelf: 'start' }}
                key={index}
                label={option.label}
                value={option.value}
                disabled={disabled}
                control={
                  <Radio
                    name={props.name}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    checked={helpers.isChecked(option.value)}
                  />
                }
              />
            ))}
          </Stack>
          {helperText && <FormHelperText disabled={disabled}>{helperText}</FormHelperText>}
          {helpers.errorMessage && (
            <FormHelperText error={helpers.error}>{helpers.errorMessage}</FormHelperText>
          )}
        </Box>
      )}
    />
  );
};
