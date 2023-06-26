import { Meta, StoryObj } from '@storybook/react';
import { H3 } from '@components';

const meta: Meta = {
  title: 'Typographies/H3',
  component: H3,
};

export default meta;

type Story = StoryObj<typeof H3>;

export const Overview: Story = {
  render: () => (
    <>
      <H3>H3</H3>
    </>
  ),
};
