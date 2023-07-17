import { Meta, StoryObj } from '@storybook/react';
import { Accordion, Stack, Typography } from '@components';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};

type Story = StoryObj<typeof Accordion>;
export default meta;

export const Overview: Story = {
  render: () => (
    <Stack spacing={2}>
      <Accordion label="Accordion 1">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </Accordion>
      <Accordion label="Accordion 2">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </Accordion>
    </Stack>
  ),
};
