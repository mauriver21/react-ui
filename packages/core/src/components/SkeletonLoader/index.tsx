import { createContext, useContext } from 'react';
import { SkeletonProps } from '@components';

export const SkeletonContext = createContext<Pick<
  SkeletonLoaderProps,
  'loading' | 'skeletonProps'
> | null>(null);
export const useSkeletonContext = () => useContext(SkeletonContext);

export interface SkeletonLoaderProps {
  loading?: boolean;
  skeletonProps?: Omit<SkeletonProps, 'children' | 'loading'>;
  children?: React.ReactNode;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  children,
  loading,
  skeletonProps,
}) => (
  <SkeletonContext.Provider value={{ skeletonProps, loading }}>
    {children}
  </SkeletonContext.Provider>
);
