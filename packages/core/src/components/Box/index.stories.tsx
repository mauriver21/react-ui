import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@components';

const meta: Meta<typeof Box> = {
  title: 'Layout Components/Box',
  component: Box,
  argTypes: {
    bgcolor: { control: 'color' },
  },
};

type Story = StoryObj<typeof Box>;
export default meta;

export const Overview: Story = {
  args: {
    bgcolor: 'blue',
    width: 300,
    height: 300,
  },
};
