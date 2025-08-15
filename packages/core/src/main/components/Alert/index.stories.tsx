import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '@main/components/Alert';

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
