import { WithNavLinkProps, withNavLink } from '@hocs';
import {
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
} from '@mui/material';

export type MenuItemProps = Omit<MuiMenuItemProps, 'children'> &
  WithNavLinkProps & {};

export const MenuItem: React.FC<MenuItemProps> = withNavLink(
  ({
    children,
    isActive = false,
    isPending = false,
    selected = false,
    linkProps: _,
    activeSx: __,
    pendingSx: ___,
    ...rest
  }) => {
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
);
