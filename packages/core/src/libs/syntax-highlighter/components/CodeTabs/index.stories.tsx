import { Meta, StoryObj } from '@storybook/react';
import { CodeTabs } from 'syntax-highlighter/components/CodeTabs';
import { Stack } from '@components/Stack';

const meta: Meta<typeof CodeTabs> = {
  title: 'Components/CodeTabs',
  component: CodeTabs,
};

type Story = StoryObj<typeof CodeTabs>;
export default meta;

export const Overview: Story = {
  render: () => {
    return (
      <Stack spacing={2}>
        <CodeTabs
          tabs={[
            {
              name: 'tsx-demo1.ts',
              language: 'typescript',
              type: 'path',
              codePath: 'codeSnippets/tsx-demo1.ts',
            },
            {
              name: 'bash-demo1.sh',
              language: 'bash',
              type: 'path',
              codePath: 'codeSnippets/bash-demo1.sh',
            },
          ]}
        />
      </Stack>
    );
  },
};
