import { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '@components/TextField';
import { Stack } from '@components/Stack';
import { SkeletonLoader } from '@components/SkeletonLoader';

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
};

type Story = StoryObj<typeof TextField>;
export default meta;

export const Overview: Story = {
  render: () => {
    return (
      <Stack spacing={1}>
        <TextField label="Name" />
      </Stack>
    );
  },
};

export const Loading: Story = {
  render: () => {
    return (
      <SkeletonLoader loading>
        <Stack spacing={1}>
          <TextField label="Name" />
          <TextField label="Name" helperText="Some helper text" />
        </Stack>
      </SkeletonLoader>
    );
  },
};
