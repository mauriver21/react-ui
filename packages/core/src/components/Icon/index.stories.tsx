import { Meta, StoryObj } from '@storybook/react';
import { Icon, Stack } from '@components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const meta: Meta = {
  title: 'Components/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Overview: Story = {
  render: () => (
    <Stack direction="column" spacing={1}>
      <Icon render={ExpandMoreIcon} />
    </Stack>
  ),
};
