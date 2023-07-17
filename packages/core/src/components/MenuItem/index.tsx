import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material';

export type MenuItemProps = MuiMenuItemProps & {};

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  return <MuiMenuItem {...props} />;
};
