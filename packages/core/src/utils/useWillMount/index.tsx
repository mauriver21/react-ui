import { useEffect, useRef } from 'react';

export const useWillMount = (callback: Function) => {
  const ref = useRef({ mounted: false });

  if (ref.current.mounted === false) {
    callback();
    ref.current.mounted = true;
  }

  useEffect(() => {
    return () => {
      ref.current.mounted = false;
    };
  }, []);
};
