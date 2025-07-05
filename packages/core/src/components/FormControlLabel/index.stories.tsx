import { Meta, StoryObj } from '@storybook/react-vite';
import { FormControlLabel } from '@components/FormControlLabel';

const meta: Meta = {
  title: 'Forms/FormControlLabel',
  component: FormControlLabel,
};

export default meta;

type Story = StoryObj<typeof FormControlLabel>;

export const Overview: Story = {
  args: { control: <>Control</>, disabled: false },
};
