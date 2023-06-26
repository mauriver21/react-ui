import { TypographyProps } from '@components';

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
