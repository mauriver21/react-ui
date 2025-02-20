import { Meta, StoryObj } from '@storybook/react';
import { AccordionDetails } from '@components/AccordionDetails';

const meta: Meta<typeof AccordionDetails> = {
  title: 'Components/AccordionDetails',
  component: AccordionDetails,
};

type Story = StoryObj<typeof AccordionDetails>;
export default meta;

export const Overview: Story = {};
