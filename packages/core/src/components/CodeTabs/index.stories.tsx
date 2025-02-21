import { Meta, StoryObj } from '@storybook/react';
import { CodeTabs } from '@components/CodeTabs';
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
              codePath: 'codeSnippets/tsx-demo1.ts',
            },
            {
              name: 'bash-demo1.sh',
              language: 'bash',
              codePath: 'codeSnippets/bash-demo1.sh',
            },
          ]}
        />
      </Stack>
    );
  },
};
