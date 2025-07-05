import { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '@components/Switch';

const meta: Meta = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Overview: Story = {};
