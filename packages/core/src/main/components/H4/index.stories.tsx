import { Meta, StoryObj } from '@storybook/react-vite';
import { H4 } from '@main/components/H4';

const meta: Meta = {
  title: 'Typographies/H4',
  component: H4,
};

export default meta;

type Story = StoryObj<typeof H4>;

export const Overview: Story = {
  render: () => (
    <>
      <H4>H4</H4>
    </>
  ),
};
