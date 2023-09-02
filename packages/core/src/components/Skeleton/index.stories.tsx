import { Meta, StoryObj } from '@storybook/react';
import { Skeleton, Stack, Typography } from '@components';
import { useEffect, useState } from 'react';
import { SkeletonLoader } from '@components';

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
          <Typography skeletonProps={{ width: 100, height: 10 }} />
        </SkeletonLoader>
      </Stack>
    );
  },
};
