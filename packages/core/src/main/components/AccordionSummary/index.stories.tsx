import { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionSummary } from '@main/components/AccordionSummary';

const meta: Meta<typeof AccordionSummary> = {
  title: 'Components/AccordionSummary',
  component: AccordionSummary,
};

type Story = StoryObj<typeof AccordionSummary>;
export default meta;

export const Overview: Story = {};
