import { Skeleton, SkeletonProps } from '@components/Skeleton';
import { useSkeletonContext } from '@components/SkeletonLoader';

export interface WithSkeletonProps {
  skeletonProps?: Omit<SkeletonProps, 'children'>;
}

export const withSkeleton = <T,>(Component: React.FC<T>) => {
  return (props: T & WithSkeletonProps) => {
    const contextProps = useSkeletonContext();
    const skeletonProps = { ...contextProps, ...props.skeletonProps };

    return (
      <Skeleton {...skeletonProps}>
        <Component {...{ ...props, skeletonProps }} />
      </Skeleton>
    );
  };
};
