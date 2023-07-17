import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-coverage',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config) => {
    // https://github.com/eirslett/storybook-builder-vite/issues/55
    config.root = dirname(require.resolve('@storybook/react-vite'));
    return config;
  },
};
export default config;
