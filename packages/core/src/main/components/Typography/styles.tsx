import { TypographyProps } from '@main/components/Typography';

export const styles = ({
  ellipsis,
  sx,
}: Partial<TypographyProps>): TypographyProps['sx'] => ({
  ...sx,
  ...(ellipsis?.maxWidth
    ? {
        maxWidth: ellipsis.maxWidth,
        overflow: 'hidden',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    : {}),
});
