import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import { withSkeleton } from '@hocs';
import { styles } from './styles';
import { useSkeletonContext } from '@components';

export interface TypographyProps extends MuiTypographyProps {
  component?: any;
  ellipsis?: {
    maxWidth: TypographyProps['maxWidth'];
  };
  skeletonText?: string;
  hideOnSkeleton?: boolean;
}

export const Typography: React.FC<TypographyProps> = withSkeleton(
  ({ ellipsis, sx, hideOnSkeleton: _, skeletonText, children, ...rest }) => {
    const skeletonContext = useSkeletonContext();

    return (
      <MuiTypography {...rest} sx={{ ...styles({ ellipsis, sx }) }}>
        {skeletonContext?.loading ? skeletonText || children : children}
      </MuiTypography>
    );
  }
);
