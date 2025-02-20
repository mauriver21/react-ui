import { Skeleton, SkeletonProps } from '@components/Skeleton';
import { useSkeletonContext } from '@components/SkeletonLoader';

export interface WithSkeletonProps {
  skeletonText?: string;
  hideOnSkeleton?: boolean;
}

export const withSkeleton = <T,>(
  Component: React.FC<T>,
  defaultProps?: Partial<SkeletonProps>
) => {
  return (props: T & WithSkeletonProps & JSX.IntrinsicAttributes) => {
    const skeletonContext = useSkeletonContext();
    return (
      <Skeleton
        {...{ ...skeletonContext?.skeletonProps, ...defaultProps }}
        hideOnSkeleton={props.hideOnSkeleton}
        loading={skeletonContext?.loading}
      >
        <Component {...props} />
      </Skeleton>
    );
  };
};
