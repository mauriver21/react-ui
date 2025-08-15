import { Field } from '@forms/interfaces/Field';
import { FieldComponentProps } from '@forms/lib/Field';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FieldValues,
  UseControllerReturn,
  useController,
} from 'react-hook-form';
import { debounce } from '@main/utils/debounce';

type FieldRef = { isSubmitting: boolean; value?: any; multiple: boolean };
const defaultRef: FieldRef = { isSubmitting: false, multiple: false };

const FieldContext = createContext<{
  field: Field;
  controller: UseControllerReturn<FieldValues, string> | undefined;
  getEventValue: (event: any) => any;
  onFieldBlur: () => void;
  onValueChange: (value: any) => void;
  ref: React.MutableRefObject<FieldRef>;
  mounted: boolean;
  setFieldRef: (current: Partial<FieldRef>) => void;
  useField: <T extends { props: any; helpers: any }>() => {
    field: T;
    setField: Dispatch<SetStateAction<T>>;
    setFieldProps: (props: Partial<T['props']>) => void;
    setFieldHelpers: (helpers: Partial<T['helpers']>) => void;
  };
}>({} as any);
export const useFieldContext = () => useContext(FieldContext);

export const withFieldProvider = <T extends FieldComponentProps>(
  BaseComponent: React.FC<T>
) => {
  return (props: T) => {
    const ref = useRef<FieldRef>({ ...defaultRef });
    const controller =
      props?.control &&
      useController({
        name: props?.name || '',
        control: props?.control,
        defaultValue: props?.value,
      });
    const debounceTime = props?.fieldOptions?.debounce || 0;
    const [mounted, setMounted] = useState(false);

    /**
     * Helper method for handling value when is undefined.
     */
    const handleValue = (value: any) => {
      const multiple = (props as any).multiple || ref.current.multiple;
      return value ?? (multiple ? [] : '');
    };

    /**
     * Field props and helpers initialization
     */
    const [field, setField] = useState<Field>({
      props: {
        id: props.id,
        name: props.name,
        value: handleValue(props.value),
      },
      helpers: {
        error: props.error || false,
        errorMessage: props.errorMessage || '',
        onValueChange: () => {},
        onFieldBlur: () => {},
      },
    });

    /**
     * Helper method for extracting the value of a form field event.
     */
    const getEventValue = (event: any) => {
      return event?.currentTarget?.value || event?.target?.value;
    };

    /**
     * Debounced version of controller field onChange method
     */
    const fieldOnChange = useCallback(
      debounce((value) => {
        if (ref.current.isSubmitting) return;
        controller?.field?.onChange?.(value);
      }, debounceTime),
      []
    );

    /**
     * Helper method for controlling react hook forms if no
     * form field event attribute matches the expected interface.
     */
    const onValueChange = (value: any) => {
      value = handleValue(value);
      fieldOnChange(value);
      setFieldProps({ value });
      setFieldRef({ value });
    };

    /**
     * Helper method for triggering react hook forms validation when the field is blurred
     * if no form field event attribute matches the expected interface.
     */
    const onFieldBlur = useCallback(
      debounce(() => {
        if (ref.current.isSubmitting) return;
        controller?.field?.onBlur();
      }, debounceTime),
      []
    );

    /**
     * Util function for setting field props.
     */
    const setFieldProps = (props: Partial<Field['props']>) => {
      setField((prev) => ({ ...prev, props: { ...prev.props, ...props } }));
    };

    /**
     * Util function for setting a field helper.
     */
    const setFieldHelpers = (helpers: Partial<Field['helpers']>) => {
      setField((prev) => ({
        ...prev,
        helpers: { ...prev.helpers, ...helpers },
      }));
    };

    /**
     * Util function for setting ref object.
     */
    const setFieldRef = (current: Partial<FieldRef>) => {
      ref.current = { ...ref.current, ...current };
    };

    /**
     * Util function for resetting field state.
     */
    const resetField = () => {
      setFieldRef(defaultRef);
      setMounted(false);
    };

    /**
     * Returns the field store.
     */
    const useField = <T extends Field>() => {
      return {
        field: field as T,
        setField: setField as Dispatch<SetStateAction<T>>,
        setFieldProps: setFieldProps as (props: Partial<T['props']>) => void,
        setFieldHelpers: setFieldHelpers as (
          helpers: Partial<T['helpers']>
        ) => void,
      };
    };

    /**
     * Extended onBlur event.
     */
    const onBlur: FieldComponentProps['onBlur'] = (event) => {
      onFieldBlur();
      props?.onBlur?.(event);
    };

    /**
     * Sets to false submitting state.
     */
    const setIsNotSubmitting = useCallback(
      debounce(() => {
        setFieldRef({ isSubmitting: false });
      }, debounceTime),
      []
    );

    /**
     * Computed error flag from react hook forms controller or error prop.
     */
    useEffect(() => {
      setFieldHelpers({
        error:
          Boolean(controller?.fieldState?.error?.message) ||
          props?.error ||
          false,
      });
    }, [controller?.fieldState?.error?.message, props?.error]);

    /**
     * Computed error message from react hook forms controller or error message prop.
     */
    useEffect(() => {
      setFieldHelpers({
        errorMessage:
          controller?.fieldState?.error?.message || props?.errorMessage || '',
      });
    }, [controller?.fieldState?.error?.message, props?.errorMessage]);

    /**
     * Handles form is submitting state.
     */
    useEffect(() => {
      const isSubmitting = controller?.formState?.isSubmitting;

      if (isSubmitting) {
        setFieldRef({ isSubmitting: true });
      } else {
        setIsNotSubmitting();
      }
    }, [controller?.formState?.isSubmitting]);

    /**
     * Handles value prop.
     */
    useEffect(() => {
      mounted && onValueChange(props.value);
    }, [props.value]);

    /**
     * Handles value prop from controller.
     */
    useEffect(() => {
      if (controller) {
        const value = handleValue(controller.field.value);
        setFieldProps({ value });
        setFieldRef({ value });
      }
    }, [controller?.field?.value]);

    /**
     * Field common methods initialization.
     */
    useEffect(() => {
      setFieldProps({ onBlur });
      setFieldHelpers({ onValueChange, onFieldBlur });
      setMounted(true);

      return () => {
        resetField();
      };
    }, []);

    return (
      <FieldContext.Provider
        value={{
          controller,
          field,
          getEventValue,
          mounted,
          onFieldBlur,
          onValueChange,
          ref,
          setFieldRef,
          useField,
        }}
      >
        <BaseComponent {...props} />
      </FieldContext.Provider>
    );
  };
};
