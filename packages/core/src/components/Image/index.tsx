import { useEffect, useRef, useState } from 'react';
import { Body2, Box, CircularProgress } from '@components';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onImageError?: (message: string) => void;
  showLoading?: boolean;
  showError?: boolean;
  failedErrorMessage?: string;
}

export const Image: React.FC<ImageProps> = ({
  onImageError,
  showLoading,
  style,
  showError,
  failedErrorMessage = 'Failed to load image',
  ...rest
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const onLoad = () => {
    onImageError?.('');
    setLoading(false);
  };

  const onError = () => {
    setHasError(true);
    onImageError?.(failedErrorMessage);
    setLoading(false);
  };

  useEffect(() => {
    const img = imgRef.current;
    if (img === null) return;

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, []);

  return (
    <div>
      {showLoading && loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress color="info" />
        </Box>
      ) : (
        <></>
      )}
      {hasError && showError ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Body2 fontWeight={500}>{failedErrorMessage}</Body2>
        </Box>
      ) : (
        <></>
      )}
      <img
        ref={imgRef}
        style={{
          ...style,
          ...(loading || (hasError && showError) ? { display: 'none' } : {}),
        }}
        {...rest}
      />
    </div>
  );
};
