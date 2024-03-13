import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useDialog,
  useDialogFactoryContext,
} from '@components';
import React, { useEffect, useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
};

type Story = StoryObj<typeof Dialog>;
export default meta;

const Dialog1: React.FC = () => {
  const { confirmDialog } = useDialogFactoryContext();
  const dialog = useDialog();

  const cancel = async () => {
    await confirmDialog();
    dialog?.close();
  };

  useEffect(() => {
    dialog?.config({ onClose: cancel });
  }, []);

  return (
    <>
      <DialogContent>
        <DialogContentText>Dialog 1</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} autoFocus>
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export const Overview: Story = {
  render: () => {
    const { createDialog } = useDialogFactoryContext();

    return (
      <>
        <Button onClick={() => createDialog({ template: <Dialog1 /> })}>
          Open
        </Button>
      </>
    );
  },
};

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

export const ConfirmationDialog: Story = {
  render: () => {
    const { confirmDialog } = useDialogFactoryContext();

    useEffect(() => {
      confirmDialog({
        message: 'Do you want to confirm this operation?',
        acceptText: 'Accept',
        cancelText: 'Cancel',
      });
    }, []);

    return <></>;
  },
};
