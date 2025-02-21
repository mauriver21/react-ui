import React, { useState } from 'react';
import { Tabs } from '@components/Tabs';
import { CodeTab } from '@interfaces/CodeTab';
import { Box, BoxProps } from '@components/Box';
import { CodeStrategy } from '@interfaces/CodeStrategy';
import { Tab } from '@components/Tab';
import { Code } from '@components/Code';
import { CodeTabs } from '@components/CodeTabs';

export type ImplementationProps = {
  texts?: { preview?: string; code?: string };
  children?: React.ReactElement;
  sx?: BoxProps['sx'];
} & (
  | { multipleCode: true; codeTabs: CodeTab[] }
  | ({ multipleCode: false } & CodeStrategy)
);

export const Implementation: React.FC<ImplementationProps> = ({
  texts,
  children,
  sx,
  ...rest
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const onChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const render = () => {
    switch (rest.multipleCode) {
      case true:
        return <CodeTabs tabs={rest.codeTabs} />;
      case false:
        const { multipleCode: _, ...codeProps } = rest;
        return <Code {...codeProps} />;
      default:
        return <></>;
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={onChange}>
          <Tab label={texts?.preview || 'Preview'} />
          <Tab label={texts?.code || 'Code'} />
        </Tabs>
      </Box>
      <Box sx={{ ...(tabIndex === 0 ? {} : { display: 'none' }) }}>
        {children}
      </Box>
      <Box sx={{ ...(tabIndex === 1 ? {} : { display: 'none' }) }}>
        {render()}
      </Box>
    </Box>
  );
};
