import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import { WithSkeletonProps, withSkeleton } from '@hocs';
import { styles } from './styles';
import { useCallback } from 'react';

export interface TypographyProps extends MuiTypographyProps, WithSkeletonProps {
  component?: any;
  ellipsis?: {
    maxWidth: TypographyProps['maxWidth'];
  };
  skeletonText?: string;
}

export const Typography: React.FC<TypographyProps> = (
  props: TypographyProps
) => {
  const Component = useCallback(
    withSkeleton(
      ({
        ellipsis,
        sx,
        skeletonProps,
        skeletonText,
        children,
        ...rest
      }: TypographyProps) => (
        <MuiTypography {...rest} sx={{ ...styles({ ellipsis, sx }) }}>
          {skeletonProps?.loading ? skeletonText || children : children}
        </MuiTypography>
      )
    ),
    []
  );

  return <Component {...props} />;
};
