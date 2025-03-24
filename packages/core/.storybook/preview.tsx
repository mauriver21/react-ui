import type { Preview, StoryContext, StoryFn } from '@storybook/react';
import { withThemeProvider } from '@hocs/withThemeProvider';
import { withNotificationsProvider } from '@hocs/withNotificationsProvider';
import { CodeProvider } from '@components/CodeProvider';
import { I18nProvider } from '@components/I18nProvider';
import { useThemeContext } from '@components/ThemeProvider';
import { useEffect } from 'react';

const scratches = import.meta.glob('../src/scratches/**/*.(ts|tsx|sh)', {
  as: 'raw',
});
const components = import.meta.glob('../src/components/**/*.(ts|tsx|sh)', {
  as: 'raw',
});

const modules = { ...scratches, ...components };
const snippets: { [key: string]: string } = {};

export const loadSnippets = async () => {
  const promises: Promise<void>[] = [];

  for (const [key, value] of Object.entries(modules)) {
    promises.push(
      new Promise(async (resolve) => {
        (snippets[key] = await value()), resolve();
      })
    );
  }

  await Promise.all(promises);
  return snippets;
};

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
}> = withThemeProvider(
  withNotificationsProvider(({ children, context }) => {
    const { theme: themeName, locale } = context.globals;
    const { changeTheme } = useThemeContext();

    // Theme handler
    useEffect(() => {
      changeTheme(themeName);
    }, [themeName]);

    return (
      <CodeProvider loadCodeSnippets={loadSnippets}>
        <I18nProvider
          language={locale}
          resources={{
            en: {
              common: {
                yes: 'Yes',
                no: 'No',
                accept: 'Accept',
                cancel: 'Cancel',
                english: 'English',
                spanish: 'Spanish',
              },
            },
            es: {
              common: {
                yes: 'Si',
                no: 'No',
                accept: 'Aceptar',
                cancel: 'Cancelar',
                english: 'Inglés',
                spanish: 'Español',
              },
            },
          }}
        >
          {children}
        </I18nProvider>
      </CodeProvider>
    );
  })
);

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
        { value: 'githubLight', left: '☀️', title: 'Github Light' },
        { value: 'githubDark', left: '🌙', title: 'Github Dark' },
        { value: 'steamLight', left: '☀️', title: 'Steam Light' },
        { value: 'steamDark', left: '🌙', title: 'Steam Dark' },
      ],
    },
  },
  locale: {
    name: 'Locale',
    title: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
      ],
    },
  },
};
