import { WithNavLinkProps, withNavLink } from '@main/hocs/withNavLink';
import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
} from '@mui/material';
import { useCallback } from 'react';

export type MenuItemProps = Omit<MuiMenuItemProps, 'children'> &
  WithNavLinkProps & {};

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const Component = useCallback(
    withNavLink(
      ({
        children,
        isActive = false,
        isPending = false,
        selected = false,
        linkProps: _,
        activeSx: __,
        pendingSx: ___,
        ...rest
      }: MenuItemProps) => {
        const content =
          typeof children === 'function' ? (
            children({ isActive, isPending })
          ) : (
            <></>
          );

        return typeof children === 'function' ? (
          <MenuItem selected={isActive || selected} {...rest}>
            {content}
          </MenuItem>
        ) : (
          <MuiMenuItem selected={isActive || selected} {...rest}>
            {children}
          </MuiMenuItem>
        );
      }
    ),
    []
  );

  return <Component {...props} />;
};
