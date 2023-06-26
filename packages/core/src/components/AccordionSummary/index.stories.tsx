import { Meta, StoryObj } from '@storybook/react';
import { AccordionSummary } from '@components';

const meta: Meta<typeof AccordionSummary> = {
  title: 'Components/AccordionSummary',
  component: AccordionSummary,
};

type Story = StoryObj<typeof AccordionSummary>;
export default meta;

export const Overview: Story = {};
