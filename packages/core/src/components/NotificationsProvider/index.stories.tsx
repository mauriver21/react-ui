import { Meta, StoryObj } from '@storybook/react-vite';
import {
  NotificationsProvider,
  useNotifications,
} from '@components/NotificationsProvider';
import { Stack } from '@components/Stack';
import { Button } from '@components/Button';

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
