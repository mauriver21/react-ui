import { Meta, StoryObj } from '@storybook/react-vite';
import { FormHelperText } from '@components/FormHelperText';

const meta: Meta = {
  title: 'Forms/FormHelperText',
  component: FormHelperText,
};

export default meta;

type Story = StoryObj<typeof FormHelperText>;

export const Overview: Story = {
  args: { children: 'Item', error: false, disabled: false },
};
