import { useFieldContext } from '@forms/hocs/withFieldProvider';
import { CommonEventHandler } from '@forms/interfaces/CommonEventHandler';
import { CommonFieldProps } from '@forms/interfaces/CommonFieldProps';
import { Field } from '@forms/interfaces/Field';
import { ReactElement, useEffect } from 'react';

type CheckboxField = Omit<Field, 'props' | 'helpers'> & {
  props: Field['props'] & {
    onChange: CommonEventHandler;
    checked: boolean;
  };
  helpers: Omit<Field['helpers'], 'onValueChange'> & {
    onValueChange: (value: any, checked: boolean) => void;
  };
};

export type CheckboxFieldProps = CommonFieldProps & {
  as: 'checkbox';
  onChange?: CommonEventHandler;
  checked?: boolean;
  uncheckedValue?: any;
  render: (field: CheckboxField) => ReactElement;
};

/**
 * Form engine CheckboxField - This component should not be implemented directly
 * as it is part of the Field component.
 */
export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const { useField, mounted, controller, ...fieldContext } = useFieldContext();
  const { field, setFieldProps, setFieldHelpers } = useField<CheckboxField>();

  /**
   * Helper method for controlling react hook forms if no
   * form field event attribute matches the expected interface.
   */
  const onValueChange = (value: any, checked: boolean) => {
    fieldContext.onValueChange(value);
    setFieldProps({ checked });
  };

  /**
   * Helper method for getting the value when checked.
   * - If no value prop is provided, checked flag is used as value.
   * - If value prop is provided, it's used as value
   * - If value and uncheckedValue prop are provided, uncheckedValue is used when checkbox is not checked.
   */
  const getValue = (checked?: boolean) => {
    if (props.value === undefined) return checked;
    if (checked) return props.value;
    return props.uncheckedValue || '';
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
  const onChange: CheckboxFieldProps['onChange'] = (event) => {
    const checked = getEventChecked(event);
    onValueChange(getValue(checked), checked);
    props?.onChange?.(event);
  };

  /**
   * Field initialization.
   */
  useEffect(() => {
    setFieldProps({ onChange });
    setFieldHelpers({ onValueChange });
    setFieldProps({ checked: false });
  }, []);

  /**
   * Computes the checked status.
   * - If value is provided, it's compared with controller field value.
   * - If no value prop is provided, it's used the boolean flag stored at controller.
   * - If checked prop is provided, it's used (controlled from outside)
   */
  useEffect(() => {
    if (controller) {
      const checked =
        (props.value !== undefined && controller.field.value == props.value) ||
        (props.value === undefined && controller.field.value) ||
        props.checked ||
        false;
      setFieldProps({ checked });
    }
  }, [controller?.field?.value]);

  /**
   * Handles value from checked prop.
   */
  useEffect(() => {
    if (props.checked !== undefined) {
      const checked = props.checked || false;
      onValueChange(getValue(checked), checked);
    }
  }, [props.checked]);

  return mounted ? props.render(field) : <></>;
};
