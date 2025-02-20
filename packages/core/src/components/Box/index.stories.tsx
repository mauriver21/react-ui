import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@components/Box';

const meta: Meta<typeof Box> = {
  title: 'Layout Components/Box',
  component: Box,
  argTypes: {
    bgcolor: { control: 'color' },
  },
};

type Story = StoryObj<typeof Box>;
export default meta;

export const Overview: Story = {
  args: {
    bgcolor: 'blue',
    width: 300,
    height: 300,
  },
};

export const ScrollBars: Story = {
  render: () => {
    return (
      <Box overflow="auto" width={300} height={300} border={1}>
        <Box height={1000}></Box>
      </Box>
    );
  },
};
