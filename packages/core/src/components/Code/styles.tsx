import { CodeProps } from '@components/Code';

export const styles = ({ sx }: Partial<CodeProps>) => ({
  ...sx,
  '& pre': { margin: 0 },
});
