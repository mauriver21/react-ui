import { Meta, StoryObj } from '@storybook/react';
import { AbsoluteBox } from '@components';

const meta: Meta<typeof AbsoluteBox> = {
  title: 'Layout Components/AbsoluteBox',
  component: AbsoluteBox,
  argTypes: {
    bgcolor: { control: 'color' },
  },
};

type Story = StoryObj<typeof AbsoluteBox>;
export default meta;

export const Overview: Story = {
  args: {
    bgcolor: 'blue',
    width: 300,
    height: 300,
  },
};
