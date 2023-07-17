import { CommonEventHandler, Field, CommonFieldProps } from '@interfaces';
import { useFieldContext } from '@hocs';
import { ReactElement, useEffect } from 'react';

type RadioGroupField = Omit<Field, 'props'> & {
  props: Field['props'] & {
    onChange: CommonEventHandler;
  };
  helpers: Field['helpers'] & {
    isChecked: (value: any) => boolean;
  };
};

export type RadioGroupFieldProps = CommonFieldProps & {
  as: 'radio-group';
  onChange?: CommonEventHandler;
  render: (field: RadioGroupField) => ReactElement;
};

/**
 * Form engine RadioGroupField - This component should not be implemented directly
 * as it is part of the Field component.
 */
export const RadioGroupField: React.FC<RadioGroupFieldProps> = (props) => {
  const { useField, getEventValue, onValueChange, mounted, ref } = useFieldContext();
  const { field, setFieldProps, setFieldHelpers } = useField<RadioGroupField>();

  /**
   * Extended onChange event.
   */
  const onChange: RadioGroupFieldProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onChange.
    onValueChange(getEventValue(event));
    props?.onChange?.(event);
  };

  /**
   * Helper function for check if the value matches the store value.
   */
  const isChecked = (value: any) => {
    if (ref.current.value === undefined) return false;
    if (ref.current.value == value) return true;
    return false;
  };

  /**
   * Field initialization
   */
  useEffect(() => {
    setFieldProps({ onChange });
    setFieldHelpers({ isChecked });
  }, []);

  return mounted ? props.render(field) : <></>;
};
