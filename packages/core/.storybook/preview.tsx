import type { Preview, StoryContext, StoryFn } from '@storybook/react';
import { withThemeProvider } from '@hocs';
import { DialogFactoryProvider, useThemeContext } from '@components';
import { useEffect } from 'react';

const globalDecorator = (Story: StoryFn, context: StoryContext) => {
  return (
    <GlobalProviders context={context}>
      <Story />
    </GlobalProviders>
  );
};

const GlobalProviders: React.FC<{
  children: React.ReactNode;
  context: StoryContext;
}> = withThemeProvider(({ children, context }) => {
  const { theme: themeName } = context.globals;
  const { changeTheme } = useThemeContext();

  // Theme handler
  useEffect(() => {
    changeTheme(themeName);
  }, [themeName]);

  return <DialogFactoryProvider>{children}</DialogFactoryProvider>;
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [globalDecorator],
};

export default preview;

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Theme for your components',
    defaultValue: 'defaultDark',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'defaultLight', left: '☀️', title: 'Default Light' },
        { value: 'defaultDark', left: '🌙', title: 'Default Dark' },
      ],
    },
  },
};
