import { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '@main/components/Stack';
import { Card } from '@main/components/Card';
import { Typography } from '@main/components/Typography';

const meta: Meta<typeof Stack> = {
  title: 'Layout Components/Stack',
  component: Stack,
  argTypes: {
    spacing: { type: 'number' },
    direction: {
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      control: {
        type: 'select',
      },
    },
  },
};

type Story = StoryObj<typeof Stack>;
export default meta;

const Item = (props: { children: React.ReactNode }) => (
  <Card sx={{ p: 1 }}>
    <Typography>{props.children}</Typography>
  </Card>
);

export const Basic: Story = {
  args: {
    spacing: 2,
    direction: 'column',
  },
  render: (args) => (
    <Stack {...args}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  ),
};
