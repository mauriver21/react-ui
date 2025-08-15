import { Meta, StoryObj } from '@storybook/react-vite';
import { FormControl } from '@main/components/FormControl';

const meta: Meta = {
  title: 'Forms/FormControl',
  component: FormControl,
};

export default meta;

type Story = StoryObj<typeof FormControl>;

export const Overview: Story = {
  args: { children: 'Form Control', error: false, disabled: false },
};
