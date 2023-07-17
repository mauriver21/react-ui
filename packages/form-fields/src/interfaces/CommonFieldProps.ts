import { CommonEventHandler, FieldProps } from '@interfaces';

export type CommonFieldProps = FieldProps & { onBlur?: CommonEventHandler };
