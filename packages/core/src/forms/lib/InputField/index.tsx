import { useFieldContext } from '@forms/hocs/withFieldProvider';
import { CommonEventHandler } from '@forms/interfaces/CommonEventHandler';
import { CommonFieldProps } from '@forms/interfaces/CommonFieldProps';
import { Field } from '@forms/interfaces/Field';
import { ReactElement, useEffect } from 'react';

type InputField = Omit<Field, 'props'> & {
  props: Field['props'] & {
    onInput: CommonEventHandler;
  };
  helpers: Field['helpers'] & {
    matches: (value: any) => boolean;
  };
};

export type InputFieldProps = CommonFieldProps & {
  as: 'input';
  multiple?: boolean;
  onInput?: CommonEventHandler;
  render: (field: InputField) => ReactElement;
};

/**
 * Form engine InputField - This component should not be implemented directly
 * as it is part of the Field component.
 */
export const InputField: React.FC<InputFieldProps> = (props) => {
  const { useField, getEventValue, onValueChange, ref } = useFieldContext();
  const { field, setFieldProps, setFieldHelpers } = useField<InputField>();

  /**
   * Extended onInput event.
   */
  const onInput: InputFieldProps['onInput'] = (event) => {
    //Form handler prop sets and validate the value onInput.
    onValueChange(getEventValue(event));
    props?.onInput?.(event);
  };

  /**
   * Helper function for check if the value matches the store value.
   */
  const matches = (value: any) => {
    if (ref.current.value === undefined) return false;
    if (Array.isArray(ref.current.value))
      return ref.current.value.some((item: any) => item == value);
    return value == ref.current.value;
  };

  /**
   * Field initialization.
   */
  useEffect(() => {
    setFieldProps({ onInput });
    setFieldHelpers({ matches });
  }, []);

  return props.render(field);
};
