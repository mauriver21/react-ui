import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import { WithSkeletonProps, withSkeleton } from '@hocs';
import { styles } from './styles';

export interface TypographyProps extends MuiTypographyProps, WithSkeletonProps {
  component?: any;
  ellipsis?: {
    maxWidth: TypographyProps['maxWidth'];
  };
  skeletonText?: string;
}

export const Typography: React.FC<TypographyProps> = withSkeleton(
  ({ ellipsis, sx, skeletonProps, skeletonText, children, ...rest }) => (
    <MuiTypography {...rest} sx={{ ...styles({ ellipsis, sx }) }}>
      {skeletonProps?.loading ? skeletonText || children : children}
    </MuiTypography>
  )
);
