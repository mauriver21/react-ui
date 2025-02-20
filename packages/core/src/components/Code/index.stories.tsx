import { Meta, StoryObj } from '@storybook/react';
import { Code } from '@components';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  argTypes: {
    bgcolor: { control: 'color' },
  },
};

type Story = StoryObj<typeof Code>;
export default meta;

export const Overview: Story = {
  render: () => {
    return <Code content="hello world" />;
  },
};
