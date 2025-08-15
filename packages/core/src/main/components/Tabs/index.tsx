import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material';

export interface TabsProps extends MuiTabsProps {}

export const Tabs: React.FC<TabsProps> = (props) => {
  return <MuiTabs {...props} />;
};
