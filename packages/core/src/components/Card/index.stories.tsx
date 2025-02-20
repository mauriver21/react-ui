import { Meta, StoryObj } from '@storybook/react';
import { Card } from '@components/Card';
import { CardContent } from '@components/CardContent';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

type Story = StoryObj<typeof Card>;
export default meta;

export const Overview: Story = {
  render: (args) => {
    return (
      <Card elevation={1} {...args}>
        <CardContent>Card Content</CardContent>
      </Card>
    );
  },
};
