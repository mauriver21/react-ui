import { Meta, StoryObj } from '@storybook/react';
import { Implementation } from '@components/Implementation';
import { Stack } from '@components/Stack';

const meta: Meta<typeof Implementation> = {
  title: 'Components/Implementation',
  component: Implementation,
};

type Story = StoryObj<typeof Implementation>;
export default meta;

export const Overview: Story = {
  render: () => {
    return (
      <Stack spacing={2}>
        <Implementation
          multipleCode
          codeTabs={[
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
