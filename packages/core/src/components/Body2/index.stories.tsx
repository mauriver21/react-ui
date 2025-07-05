import { Meta, StoryObj } from '@storybook/react-vite';
import { Body2 } from '@components/Body2';

const meta: Meta = {
  title: 'Typographies/Body2',
  component: Body2,
};

export default meta;

type Story = StoryObj<typeof Body2>;

export const Overview: Story = {
  render: () => (
    <>
      <Body2>Body2</Body2>
    </>
  ),
};
