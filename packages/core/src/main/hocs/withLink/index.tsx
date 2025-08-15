import { Link, LinkProps } from '@main/components/Link';
import { Path } from 'react-router-dom';

/**
 * HOC for conditionally wrapping a component with the react router dom Link component.
 */
export interface WithLinkProps {
  linkProps?: Omit<LinkProps, 'to'> & { to?: string | Partial<Path> };
}

export const withLink = <T extends WithLinkProps>(Component: React.FC<T>) => {
  return (props: T) => (
    <>
      {props.linkProps?.to ? (
        <Link to={props.linkProps?.to} {...props.linkProps}>
          <Component {...props} />
        </Link>
      ) : (
        <Component {...props} />
      )}
    </>
  );
};
