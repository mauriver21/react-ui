import { Code } from '@components/Code';
import { Tabs } from '@components/Tabs';
import { CodeTab } from '@interfaces/CodeTab';
import { useState } from 'react';
import { Box } from '@components/Box';
import { Tab } from '@components/Tab';
import './index.css';

export interface CodeTabsProps {
  tabs: CodeTab[];
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const onChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={onChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.name} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <Code
          sx={{ ...(tabIndex !== index ? { display: 'none' } : {}) }}
          key={index}
          {...tab}
        />
      ))}
    </Box>
  );
};
