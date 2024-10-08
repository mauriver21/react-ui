import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  NotificationsProvider,
  Stack,
  useNotifications,
} from '@components';

const meta: Meta<typeof NotificationsProvider> = {
  title: 'Components/NotificationsProvider',
  component: NotificationsProvider,
};

type Story = StoryObj<typeof NotificationsProvider>;
export default meta;

export const Overview: Story = {
  render: () => {
    const { printErrorMessage, printSuccessMessage } = useNotifications();

    return (
      <Stack direction="row" spacing={1}>
        <Button onClick={() => printSuccessMessage('Success Message')}>
          Show success message
        </Button>
        <Button onClick={() => printErrorMessage('Error Message')}>
          Show error message
        </Button>
      </Stack>
    );
  },
};
