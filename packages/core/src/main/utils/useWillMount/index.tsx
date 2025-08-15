import { useEffect, useRef } from 'react';

export const useWillMount = (callback: Function) => {
  const ref = useRef({ mounted: false, unmountCallback: () => {} });

  if (ref.current.mounted === false) {
    ref.current.unmountCallback = callback();
    ref.current.mounted = true;
  }

  useEffect(() => {
    return () => {
      ref.current.mounted = false;
      ref.current.unmountCallback?.();
    };
  }, []);
};
