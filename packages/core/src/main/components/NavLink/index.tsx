import {
  NavLink as BaseNavLink,
  NavLinkProps as BaseNavLinkProps,
} from 'react-router-dom';
import './index.css';

export interface NavLinkProps extends BaseNavLinkProps {}

export const NavLink: React.FC<NavLinkProps> = ({
  style,
  className = '',
  ...rest
}) => {
  return (
    <BaseNavLink
      className={`base-route-nav-link ${className}`}
      style={{ textDecoration: 'none', ...style }}
      {...rest}
    />
  );
};
