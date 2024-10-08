import { Meta, StoryObj } from '@storybook/react';
import { Select, SkeletonLoader, Stack } from '@components';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
};

type Story = StoryObj<typeof Select>;
export default meta;

export const Overview: Story = {
  render: () => {
    return (
      <Stack spacing={1}>
        <Select
          label="Countries"
          options={[
            { label: 'Colombia', value: 1 },
            { label: 'Venezuela', value: 2 },
            { label: 'Ecuador', value: 3 },
          ]}
        />
      </Stack>
    );
  },
};

export const Loading: Story = {
  render: () => {
    return (
      <SkeletonLoader loading>
        <Stack spacing={1}>
          <Select
            label="Countries"
            options={[
              { label: 'Colombia', value: 1 },
              { label: 'Venezuela', value: 2 },
              { label: 'Ecuador', value: 3 },
            ]}
          />
          <Select
            label="Countries"
            options={[
              { label: 'Colombia', value: 1 },
              { label: 'Venezuela', value: 2 },
              { label: 'Ecuador', value: 3 },
            ]}
            helperText="Helper text example..."
          />
        </Stack>
      </SkeletonLoader>
    );
  },
};
