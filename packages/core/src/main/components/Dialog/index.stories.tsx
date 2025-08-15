import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '@main/components/Dialog';
import { Button } from '@main/components/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
};

type Story = StoryObj<typeof Dialog>;
export default meta;

export const ControlledDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const cancel = () => {
      setOpen(false);
    };

    return (
      <>
        <Dialog onClose={cancel} open={open}>
          <Button onClick={cancel}>Cancel</Button>
        </Dialog>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </>
    );
  },
};
