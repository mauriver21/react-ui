import { Meta, StoryObj } from '@storybook/react-vite';
import { H1 } from '@components/H1';

const meta: Meta = {
  title: 'Typographies/H1',
  component: H1,
};

export default meta;

type Story = StoryObj<typeof H1>;

export const Overview: Story = {
  render: () => (
    <>
      <H1>H1</H1>
    </>
  ),
};
