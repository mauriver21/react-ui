import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@main/components/Button';
import { Tooltip } from '@main/components/Tooltip';

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
