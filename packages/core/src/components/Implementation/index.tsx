import React, { useState } from 'react';
import { Tabs } from '@components/Tabs';
import { CodeTab } from '@interfaces/CodeTab';
import { Box } from '@components/Box';
import { CodeStrategy } from '@interfaces/CodeStrategy';
import { Tab } from '@components/Tab';
import { Code } from '@components/Code';

export type ImplementationProps = {
  texts?: { preview?: string; code?: string };
  children?: React.ReactElement;
  class?: string;
} & (
  | { multipleCode: true; codeTabs: CodeTab[] }
  | ({ multipleCode: false } & CodeStrategy)
);

export const Implementation: React.FC<ImplementationProps> = ({
  texts,
  children,
  ...rest
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const onChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const render = () => {
    switch (rest.multipleCode) {
      case true:
        return (
          <>
            {rest.codeTabs.map((tab, index) => (
              <Code
                sx={{ ...(tabIndex !== index ? { display: 'none' } : {}) }}
                key={index}
                {...tab}
              />
            ))}
          </>
        );
      case false:
        return <Code {...rest} />;
      default:
        return <></>;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
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
