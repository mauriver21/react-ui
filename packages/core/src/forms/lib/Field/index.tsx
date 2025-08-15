import { withFieldProvider } from '@forms/hocs/withFieldProvider';
import { CheckboxFieldProps, CheckboxField } from '@forms/lib/CheckboxField';
import {
  CheckboxGroupFieldProps,
  CheckboxGroupField,
} from '@forms/lib/CheckboxGroupField';
import { InputFieldProps, InputField } from '@forms/lib/InputField';
import {
  RadioGroupFieldProps,
  RadioGroupField,
} from '@forms/lib/RadioGroupField';

export type FieldComponentProps =
  | InputFieldProps
  | CheckboxFieldProps
  | CheckboxGroupFieldProps
  | RadioGroupFieldProps;

export const Field: React.FC<FieldComponentProps> = withFieldProvider(
  (props) => {
    switch (props.as) {
      case 'input':
        return <InputField {...props} />;
      case 'radio-group':
        return <RadioGroupField {...props} />;
      case 'checkbox':
        return <CheckboxField {...props} />;
      case 'checkbox-group':
        return <CheckboxGroupField {...props} />;
      default:
        return <></>;
    }
  }
);
