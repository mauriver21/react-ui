import { CommonEventHandler } from '@forms/interfaces/CommonEventHandler';

export type Field = {
  props: {
    value?: any;
    id?: string;
    name?: string;
    onBlur?: CommonEventHandler;
  };
  helpers: {
    errorMessage: string;
    error: boolean;
    onValueChange: (value: any) => void;
    onFieldBlur: () => void;
  };
};
