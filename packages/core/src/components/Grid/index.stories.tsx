import { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@components/Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout Components/Grid',
  component: Grid,
  argTypes: {
    bgcolor: { control: 'color' },
  },
};

type Story = StoryObj<typeof Grid>;
export default meta;

export const Overview: Story = {};
