import { useEffect } from 'react';

export interface StyleProps {
  id?: string;
  css: string;
  children?: React.ReactNode;
}

export const Style: React.FC<StyleProps> = ({ id, children, css }) => {
  useEffect(() => {
    const node = document.createElement('style');
    if (id) node.id = id;
    node.textContent = css;
    document.head.appendChild(node);
    return () => {
      node.remove();
    };
  }, [css]);
  return <>{children}</>;
};
