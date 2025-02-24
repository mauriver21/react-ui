import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, BoxProps } from '@components/Box';
import { useCodeContext } from '@components/CodeProvider';
import { CodeStrategy } from '@interfaces/CodeStrategy';
import { styles } from './styles';

export type CodeProps = BoxProps & {
  language?: string;
  codeClass?: string;
  mapReplace?: { [matchText: string]: string };
  noBorder?: boolean;
  sx?: BoxProps['sx'];
} & CodeStrategy;

export const Code: React.FC<CodeProps> = ({
  language,
  codeClass,
  mapReplace,
  noBorder,
  sx,
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
      console.log(1);
      let content = '';
      if (rest.type === 'path') {
        content = codeContext?.getRawCode(rest.codePath) || '';
      } else if (rest.type === 'content') {
        content = rest.code;
      }

      const code = formatCode(content);
      code && setCode(code);
    }
  }, [initialized]);

  return (
    <Box sx={styles({ sx })}>
      <SyntaxHighlighter language={language} style={atomOneDark}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};
