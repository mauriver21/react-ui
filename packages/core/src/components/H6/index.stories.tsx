import { Meta, StoryObj } from '@storybook/react';
import { H6 } from '@components';

const meta: Meta = {
  title: 'Typographies/H6',
  component: H6,
};

export default meta;

type Story = StoryObj<typeof H6>;

export const Overview: Story = {
  render: () => (
    <>
      <H6>H6</H6>
    </>
  ),
};
