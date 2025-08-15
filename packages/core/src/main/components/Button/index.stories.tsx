import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@main/components/Button';
import { Stack } from '@main/components/Stack';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

type Story = StoryObj<typeof Button>;
export default meta;

export const Overview: Story = {
  render: () => (
    <Stack maxWidth={150} spacing={1}>
      <Button title="Button with title" tooltipProps={{ placement: 'right' }}>
        Button with title
      </Button>
      <Button
        disabled
        title="Button disabled with title"
        tooltipProps={{ placement: 'right' }}
      >
        Button disabled with title
      </Button>
    </Stack>
  ),
};

export const Playground: Story = {
  args: { variant: 'contained', color: 'primary', children: 'Text' },
};
