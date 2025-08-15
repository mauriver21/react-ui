import { Box, BoxProps } from '@main/components/Box';
import { FormControl } from '@main/components/FormControl';
import { FormHelperText } from '@main/components/FormHelperText';
import { InputLabel } from '@main/components/InputLabel';
import { MenuItem } from '@main/components/MenuItem';
import { withDefaultProps } from '@main/hocs/withDefaultProps';
import { SelectableOption } from '@main/interfaces/SelectableOption';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';
import { useCallback } from 'react';

export type SelectProps = MuiSelectProps & {
  rootSx?: BoxProps['sx'];
  defaultRootSx?: BoxProps['sx'];
  helperText?: string;
  options?: Array<SelectableOption>;
  errorMessage?: string;
};

export const Select: React.FC<SelectProps> = (props) => {
  const Component = useCallback(
    withDefaultProps(
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
              <FormHelperText disabled={rest.disabled}>
                {helperText}
              </FormHelperText>
            )}
            {errorMessage && (
              <FormHelperText error={error}>{errorMessage}</FormHelperText>
            )}
          </Box>
        );
      },
      'Select'
    ),
    []
  );

  return <Component {...props} />;
};
