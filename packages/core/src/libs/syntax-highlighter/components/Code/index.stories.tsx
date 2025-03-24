import { Meta, StoryObj } from '@storybook/react';
import { Code } from 'syntax-highlighter/components/Code';
import { Stack } from '@components/Stack';
import { useEffect, useState } from 'react';

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
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }, []);

    return (
      <Stack spacing={2}>
        <Code type="path" language="tsx" codePath="codeSnippets/tsx-demo1.ts" />
        <Code
          type="path"
          language="bash"
          codePath="codeSnippets/bash-demo1.sh"
        />
        <Code type="content" language="bash" code={JSON.stringify({ count })} />
      </Stack>
    );
  },
};
