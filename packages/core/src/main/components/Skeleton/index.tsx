import {
  Skeleton as MuiSkeleton,
  SkeletonProps as MuiSkeletonProps,
} from '@mui/material';

export interface SkeletonProps extends MuiSkeletonProps {
  loading?: boolean;
  fitContent?: boolean;
  noTransform?: boolean;
  hideOnSkeleton?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  loading,
  children,
  style,
  fitContent,
  noTransform,
  hideOnSkeleton = false,
  ...rest
}) => (
  <>
    {loading && !hideOnSkeleton ? (
      <MuiSkeleton
        {...rest}
        style={{
          ...style,
          ...(fitContent ? { maxWidth: '100%', transform: 'none' } : {}),
          ...(noTransform ? { transform: 'none' } : {}),
          ...(hideOnSkeleton ? { display: 'none' } : {}),
        }}
      >
        {children}
      </MuiSkeleton>
    ) : (
      <></>
    )}
    {loading && hideOnSkeleton ? <></> : <></>}
    {!loading ? children : <></>}
  </>
);
