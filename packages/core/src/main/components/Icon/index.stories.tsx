import { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '@main/components/Icon';
import { Stack } from '@main/components/Stack';
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
