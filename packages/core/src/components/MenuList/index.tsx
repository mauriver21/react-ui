import {
  MenuList as MuiMenuList,
  MenuListProps as MuiMenuListProps,
} from '@mui/material';

export type MenuListProps = MuiMenuListProps & {};

export const MenuList: React.FC<MenuListProps> = (props) => {
  return <MuiMenuList {...props} />;
};
