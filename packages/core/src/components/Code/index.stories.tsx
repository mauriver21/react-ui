import { Meta, StoryObj } from '@storybook/react';
import { Code } from '@components/Code';
import { Stack } from '@components/Stack';

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
    return (
      <Stack spacing={2}>
        <Code type="path" language="tsx" codePath="codeSnippets/tsx-demo1.ts" />
        <Code
          type="path"
          language="bash"
          codePath="codeSnippets/bash-demo1.sh"
        />
      </Stack>
    );
  },
};
