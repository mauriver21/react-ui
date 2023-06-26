import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@components';

const meta: Meta<typeof Alert> = {
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Overview: Story = {
  args: {
    color: 'info',
    children: 'Info Alert',
  },
};
