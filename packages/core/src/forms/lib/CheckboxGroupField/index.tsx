import { useFieldContext } from '@forms/hocs/withFieldProvider';
import { CommonEventHandler } from '@forms/interfaces/CommonEventHandler';
import { CommonFieldProps } from '@forms/interfaces/CommonFieldProps';
import { Field } from '@forms/interfaces/Field';
import { ReactElement, useEffect } from 'react';

type CheckboxGroupField = Omit<Field, 'props' | 'helpers'> & {
  props: Field['props'] & {
    onChange: CommonEventHandler;
    value: never[];
  };
  helpers: Omit<Field['helpers'], 'onValueChange'> & {
    onValueChange: (value: any, checked: boolean) => void;
    isChecked: (value: any) => boolean;
  };
};

export type CheckboxGroupFieldProps = CommonFieldProps & {
  as: 'checkbox-group';
  onChange?: CommonEventHandler;
  render: (field: CheckboxGroupField) => ReactElement;
};

/**
 * Form engine CheckboxGroupField - This component should not be implemented directly
 * as it is part of the Field component.
 */
export const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = (
  props
) => {
  const {
    useField,
    getEventValue,
    mounted,
    ref,
    setFieldRef,
    ...fieldContext
  } = useFieldContext();
  const { field, setFieldProps, setFieldHelpers } =
    useField<CheckboxGroupField>();

  /**
   * Helper method for setting the value to the form controller if no
   * form field event attribute matches the expected interface.
   */
  const onValueChange = (value: any, checked: boolean) => {
    if (checked) {
      fieldContext.onValueChange([...ref.current.value, value]);
      //If unchecked, value is filtered from form controller.
    } else {
      fieldContext.onValueChange(
        ref.current.value.filter?.((item: any) => value != item)
      );
    }
  };

  /**
   * Helper method for extracting the checked flag of a form field event.
   */
  const getEventChecked = (event: any) => {
    return event?.currentTarget?.checked || event?.target?.checked;
  };

  /**
   * Extended onChange event.
   */
  const onChange: CheckboxGroupFieldProps['onChange'] = (event) => {
    //Form handler prop sets and validate the value onChange.
    onValueChange(getEventValue(event), getEventChecked(event));
    props?.onChange?.(event);
  };

  /**
   * Helper function for check if the value matches the store value.
   */
  const isChecked = (value: any) =>
    ref.current.value.some((item: any) => item == value);

  /**
   * Field initialization
   */
  useEffect(() => {
    setFieldProps({ onChange });
    setFieldHelpers({ isChecked, onValueChange });
    setFieldProps({ value: [] });
    setFieldRef({ multiple: true, value: [] });
  }, []);

  return mounted ? props.render(field) : <></>;
};
