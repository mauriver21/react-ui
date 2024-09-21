import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema, AnySchema } from 'yup';
import {
  DeepPartial,
  useForm as useReactHookForm,
  UseFormReset,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

type Options = Omit<Parameters<typeof useReactHookForm>, 'resolver'>[0];
type ResetOptions = Parameters<UseFormReset<any>>[1];
type HandleSubmit<T extends FieldValues = FieldValues> =
  UseFormReturn<T>['handleSubmit'];

export const useForm = <T extends FieldValues>(
  schema: AnySchema<T>,
  options?: Options
) => {
  const defaultValues = useMemo(
    () => schema.getDefault(),
    []
  ) as DeepPartial<T>;
  const form = useReactHookForm({
    resolver: yupResolver(schema as AnyObjectSchema),
    defaultValues,
    ...{ mode: 'all', delayError: 200, ...options },
  });

  const reset = (options?: ResetOptions) => {
    form.reset(schema.getDefault(), options);
  };

  const fill = (data: T, options?: ResetOptions) => {
    form.reset(data as FieldValues, options);
  };

  const handleSubmit: HandleSubmit<T> = (...args) => {
    return form.handleSubmit(...(args as Parameters<HandleSubmit>));
  };

  const isInvalid = useCallback(
    () => !form.formState.isValid,
    [form.formState.isValid]
  );

  const hasChanges = useCallback(
    () => form.formState.isDirty,
    [form.formState.isDirty]
  );

  return { ...form, reset, fill, isInvalid, hasChanges, handleSubmit };
};
