import { Meta, StoryObj } from '@storybook/react';
import { H2 } from '@components/H2';

const meta: Meta = {
  title: 'Typographies/H2',
  component: H2,
};

export default meta;

type Story = StoryObj<typeof H2>;

export const Overview: Story = {
  render: () => (
    <>
      <H2>H2</H2>
    </>
  ),
};
