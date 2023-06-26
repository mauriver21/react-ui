import { Meta, StoryObj } from '@storybook/react';
import { H5 } from '@components';

const meta: Meta = {
  title: 'Typographies/H5',
  component: H5,
};

export default meta;

type Story = StoryObj<typeof H5>;

export const Overview: Story = {
  render: () => (
    <>
      <H5>H5</H5>
    </>
  ),
};
