import {
  Box,
  BoxProps,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@components';
import { withDefaultProps } from '@hocs';
import { SelectableOption } from '@interfaces';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';

export type SelectProps = MuiSelectProps & {
  rootSx?: BoxProps['sx'];
  helperText?: string;
  options?: Array<SelectableOption>;
  errorMessage?: string;
};

export const Select: React.FC<SelectProps> = withDefaultProps(
  ({
    rootSx,
    helperText,
    options = [],
    error,
    fullWidth = true,
    errorMessage,
    ...rest
  }) => (
    <Box sx={rootSx}>
      <FormControl fullWidth>
        {rest.label && (
          <InputLabel id={rest.labelId} error={error} disabled={rest.disabled}>
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
  ),
  'Select'
);
