import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@components/Skeleton';
import { sleep } from '@utils/sleep';
import { SkeletonLoader } from '@components/SkeletonLoader';
import { Stack } from '@components/Stack';
import { Typography } from '@components/Typography';

const meta: Meta<typeof Skeleton> = {
  title: 'Layout Components/Skeleton',
  component: Skeleton,
};

type Story = StoryObj<typeof Skeleton>;
export default meta;

export const TypographiesSkeleton: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      (async () => {
        await sleep(1000);
        setLoading(false);
      })();
    }, []);

    return (
      <Stack spacing={1}>
        <SkeletonLoader loading={loading}>
          <Typography variant="h1">h1 text</Typography>
          <Typography variant="h2">h2 text</Typography>
          <Typography variant="h3">h3 text</Typography>
          <Typography variant="h4">h4 text</Typography>
          <Typography variant="h5">h5 text</Typography>
          <Typography variant="h6">h6 text</Typography>
          <Typography variant="body1">body1 text</Typography>
          <Typography variant="body2">body2 text</Typography>
        </SkeletonLoader>
      </Stack>
    );
  },
};
