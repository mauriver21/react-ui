import { CodeProps } from '@syntax-highlighter/components/Code';

export const styles = ({ sx }: Partial<CodeProps>) => ({
  ...sx,
  '& pre': { margin: 0 },
  '& pre code': { textWrap: 'auto', whiteSpace: 'pre-wrap !important' },
});
