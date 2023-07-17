import { Meta, StoryObj } from '@storybook/react';
import { InputLabel } from '@components';

const meta: Meta = {
  title: 'Forms/InputLabel',
  component: InputLabel,
};

export default meta;

type Story = StoryObj<typeof InputLabel>;

export const Overview: Story = {
  args: { children: 'Item', error: false, disabled: false },
};
