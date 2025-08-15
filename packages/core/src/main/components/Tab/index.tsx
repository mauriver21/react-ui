import { Tab as MuiTab, TabProps as MuiTabProps } from '@mui/material';

export interface TabProps extends MuiTabProps {}

export const Tab: React.FC<TabProps> = (props) => {
  return <MuiTab {...props} />;
};
