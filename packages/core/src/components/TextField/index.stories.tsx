import { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@components';

const meta: Meta = {
  title: 'Components/TextField',
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Overview: Story = {
  args: {
    label: 'Label example',
  },
};
