import {
  CheckboxField,
  CheckboxFieldProps,
  CheckboxGroupField,
  CheckboxGroupFieldProps,
  InputField,
  InputFieldProps,
  RadioGroupField,
  RadioGroupFieldProps,
} from '@components';
import { withFieldProvider } from '@hocs';

export type FieldComponentProps =
  | InputFieldProps
  | CheckboxFieldProps
  | CheckboxGroupFieldProps
  | RadioGroupFieldProps;

export const Field: React.FC<FieldComponentProps> = withFieldProvider((props) => {
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
});
