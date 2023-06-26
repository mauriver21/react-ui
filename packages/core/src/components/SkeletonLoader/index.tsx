import { createContext, useContext } from 'react';
import { SkeletonProps } from '@components';

export const SkeletonContext = createContext<Omit<SkeletonProps, 'children'>>(
  {} as any
);
export const useSkeletonContext = () => useContext(SkeletonContext);

export interface SkeletonLoaderProps extends SkeletonProps {}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  children,
  ...rest
}) => {
  return (
    <SkeletonContext.Provider value={rest}>{children}</SkeletonContext.Provider>
  );
};
