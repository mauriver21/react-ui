import React, { createContext, useContext, useEffect, useState } from 'react';

export type CodeContextType = {
  getRawCode: (path: string) => string;
  loading: boolean;
};

export const CodeContext = createContext<CodeContextType | undefined>(
  undefined
);
export const useCodeContext = () => useContext(CodeContext);
export interface CodeProviderProps {
  children?: React.ReactElement;
  loadCodeSnippets: () => Promise<{ [key: string]: string }>;
}

export const CodeProvider: React.FC<CodeProviderProps> = ({
  children,
  loadCodeSnippets,
}) => {
  const [loading, setLoading] = useState(true);
  const [snippets, setSnippets] = useState<{ [key: string]: string }>({});

  const getRawCode = (path: string): string => {
    path = path.replace(/^\//, '');

    for (let key in snippets) {
      if (key.match(`/${path}`)) {
        return snippets[key];
      }
    }

    return '';
  };

  const init = async () => {
    setSnippets(await loadCodeSnippets());
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <CodeContext.Provider value={{ loading, getRawCode }}>
      {children}
    </CodeContext.Provider>
  );
};
