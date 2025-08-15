import React, { useEffect, useState } from 'react';
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, BoxProps } from '@components/Box';
import { useCodeContext } from 'syntax-highlighter/components/CodeProvider';
import { CodeStrategy } from '@interfaces/CodeStrategy';
import { styles } from './styles';

export type CodeProps = BoxProps & {
  language?: string;
  mapReplace?: { [matchText: string]: string };
  sx?: BoxProps['sx'];
  syntaxHighlighterProps?: SyntaxHighlighterProps;
} & CodeStrategy;

export const Code: React.FC<CodeProps> = ({
  language,
  mapReplace,
  sx,
  syntaxHighlighterProps,
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
      if (rest.type === 'path') {
        content = codeContext?.getRawCode(rest.codePath) || '';
      } else if (rest.type === 'content') {
        content = rest.code;
      }

      const code = formatCode(content);
      code && setCode(code);
    }
  }, [initialized, (rest as any)?.codePath, (rest as any)?.code]);

  return (
    <Box sx={styles({ sx })}>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        {...syntaxHighlighterProps}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};
