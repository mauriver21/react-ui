import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import { withSkeleton } from '@main/hocs/withSkeleton';
import { styles } from './styles';
import { useCallback } from 'react';
import { useSkeletonContext } from '@main/components/SkeletonLoader';

export interface TypographyProps extends MuiTypographyProps {
  component?: any;
  ellipsis?: {
    maxWidth: TypographyProps['maxWidth'];
  };
  skeletonText?: string;
  hideOnSkeleton?: boolean;
}

export const Typography: React.FC<TypographyProps> = (props) => {
  const Component = useCallback(
    withSkeleton(
      ({
        ellipsis,
        sx,
        hideOnSkeleton: _,
        skeletonText,
        children,
        ...rest
      }: TypographyProps) => {
        const skeletonContext = useSkeletonContext();

        return (
          <MuiTypography {...rest} sx={{ ...styles({ ellipsis, sx }) }}>
            {skeletonContext?.loading ? skeletonText || children : children}
          </MuiTypography>
        );
      }
    ),
    []
  );

  return <Component {...props} />;
};
