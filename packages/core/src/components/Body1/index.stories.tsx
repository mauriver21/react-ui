import { Meta, StoryObj } from '@storybook/react';
import { Body1 } from '@components';

const meta: Meta = {
  title: 'Typographies/Body1',
  component: Body1,
};

export default meta;

type Story = StoryObj<typeof Body1>;

export const Overview: Story = {
  render: () => (
    <>
      <Body1>Body1</Body1>
    </>
  ),
};
