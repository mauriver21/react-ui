import { AbsoluteBox } from '@components/AbsoluteBox';
import { BoxProps } from '@components/Box';
import { CircularProgress } from '@components/CircularProgress';
import { Stack } from '@components/Stack';

export interface LoadingBackdropProps extends BoxProps {}

export const LoadingBackdrop: React.FC<LoadingBackdropProps> = (props) => (
  <AbsoluteBox
    display="flex"
    alignItems="center"
    justifyContent="center"
    zIndex={1}
    bgcolor={'rgba(0,0,0,0.2)'}
    {...props}
  >
    <Stack alignItems="center">
      <CircularProgress color="info" />
    </Stack>
  </AbsoluteBox>
);
