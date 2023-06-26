import {
  Skeleton as MuiSkeleton,
  SkeletonProps as MuiSkeletonProps,
} from '@mui/material';

export interface SkeletonProps extends MuiSkeletonProps {
  loading?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  loading,
  children,
  ...rest
}) => (
  <>{loading ? <MuiSkeleton {...rest}>{children}</MuiSkeleton> : children}</>
);
