import { Control } from 'react-hook-form';

export type FieldProps = {
  id?: string;
  error?: boolean;
  errorMessage?: string;
  control?: Control;
  name?: string;
  triggers?: string[];
  value?: any;
  fieldOptions?: {
    debounce?: number;
  };
};
