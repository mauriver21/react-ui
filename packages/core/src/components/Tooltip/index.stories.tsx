import { Meta, StoryObj } from '@storybook/react';
import { Button, Tooltip } from '@components';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

type Story = StoryObj<typeof Tooltip>;
export default meta;

export const Overview: Story = {
  render: () => (
    <>
      <Tooltip title="Add" arrow>
        <Button>Arrow</Button>
      </Tooltip>
    </>
  ),
};
