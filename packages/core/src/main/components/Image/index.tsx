import { Body2 } from '@main/components/Body2';
import { Box } from '@main/components/Box';
import { CircularProgress } from '@main/components/CircularProgress';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onImageError?: (message: string) => void;
  showLoading?: boolean;
  showError?: boolean;
  failedErrorMessage?: string;
}

export type ImageHandle = {
  img: HTMLImageElement | null;
};

export const Image = forwardRef<ImageHandle, ImageProps>(
  (
    {
      onImageError,
      showLoading,
      style,
      showError,
      failedErrorMessage = 'Failed to load image',
      ...rest
    },
    ref
  ) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState(false);
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

    useImperativeHandle(ref, () => ({ img: imgRef.current }));

    return (
      <div style={{ display: 'contents' }}>
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
  }
);
