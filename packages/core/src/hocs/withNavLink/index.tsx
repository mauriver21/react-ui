import { Path } from 'react-router-dom';
import { BoxProps, NavLink, NavLinkProps } from '@components';

/**
 * HOC for conditionally wrapping a component with the react router dom NavLink component.
 */
export interface WithNavLinkProps {
  linkProps?: Omit<NavLinkProps, 'to'> & { to?: string | Partial<Path> };
  isActive?: boolean;
  sx?: BoxProps['sx'];
  activeSx?: BoxProps['sx'];
  pendingSx?: BoxProps['sx'];
  isPending?: boolean;
  children?: NavLinkProps['children'];
}

export const withNavLink = <T extends WithNavLinkProps>(
  Component: React.FC<T>
) => {
  return (props: T) => {
    return (
      <>
        {props.linkProps?.to ? (
          <NavLink to={props.linkProps?.to} {...props.linkProps}>
            {({ isActive, isPending }) => (
              <Component
                isActive={isActive}
                isPending={isPending}
                {...props}
                sx={{
                  ...(isActive ? props.activeSx : {}),
                  ...(isPending ? props.pendingSx : {}),
                  ...props.sx,
                }}
              />
            )}
          </NavLink>
        ) : (
          <Component {...props} />
        )}
      </>
    );
  };
};
