import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import './index.css';
import React, { useEffect, useState } from 'react';
import { Box, BoxProps } from '@components/Box';
import { useCodeContext } from '@components/CodeProvider';

export interface CodeProps extends BoxProps {
  language?: string;
  content?: string;
  codePath?: string;
  codeClass?: string;
  mapReplace?: { [matchText: string]: string };
  noBorder?: boolean;
}

export const Code: React.FC<CodeProps> = ({
  language,
  codePath,
  content: contentProp = '',
  codeClass,
  mapReplace,
  noBorder,
  ...rest
}) => {
  const codeContext = useCodeContext();
  const [code, setCode] = useState('');
  const initialized =
    codeContext?.loading === false || codeContext === undefined;

  const formatCode = (code: string = '') => {
    mapReplace &&
      Object.keys(mapReplace).forEach((matchText) => {
        const newValue = mapReplace![matchText];
        code = code.replace(new RegExp(`${matchText}`, 'ig'), newValue);
      });

    if (code.match('//@ts-nocheck')) {
      code = code.replace('//@ts-nocheck', '');
      return code.substring(code.indexOf('\n') + 1);
    } else {
      return code;
    }
  };

  useEffect(() => {
    if (initialized) {
      let content = '';
      if (codePath) content = codeContext?.getRawCode(codePath) || '';
      content = contentProp;

      const code = formatCode(content);
      code && setCode(code);
    }
  }, [initialized]);

  return (
    <Box {...rest}>
      <Highlight className={language}>{code}</Highlight>
    </Box>
  );
};
