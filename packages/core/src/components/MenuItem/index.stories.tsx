import { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from '@components/MenuItem';

const meta: Meta = {
  title: 'Components/MenuItem',
  component: MenuItem,
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Overview: Story = {
  args: { children: 'Item' },
};
