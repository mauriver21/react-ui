import { Link as BaseLink, LinkProps as BaseLinkProps } from 'react-router-dom';
import './index.css';

export interface LinkProps extends BaseLinkProps {}

export const Link: React.FC<LinkProps> = ({
  style,
  className = '',
  ...rest
}) => {
  return (
    <BaseLink
      className={`base-route-link ${className}`}
      style={{ textDecoration: 'none', ...style }}
      {...rest}
    />
  );
};
