import { CommonEventHandler } from '@forms/interfaces/CommonEventHandler';
import { FieldProps } from '@forms/interfaces/FieldProps';

export type CommonFieldProps = FieldProps & { onBlur?: CommonEventHandler };
