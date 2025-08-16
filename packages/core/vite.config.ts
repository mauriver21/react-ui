import fs from 'fs';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { defineConfig, LibraryOptions, PluginOption } from 'vite';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const MAIN_LIBRARY_NAME = packageJson.name;
const { peerDependencies, devDependencies } = packageJson;

const externalDeps = [
  ...Object.keys(peerDependencies),
  ...Object.keys(devDependencies),
  MAIN_LIBRARY_NAME,
];

const REWRITE_MAIN_PLUGIN: PluginOption = {
  name: 'replace-main-imports',
  enforce: 'post',
  transform(code, id) {
    if (id.includes('src/main')) {
      return code;
    }
    return code.replace(/@main\/[^'"]+/g, MAIN_LIBRARY_NAME);
  },
};

// centralize entries instead of multiple vite.build calls
const ENTRY_POINTS: Record<string, string> = {
  'i18next/index': 'src/i18next/index.ts',
  'syntax-highlighter/index': 'src/syntax-highlighter/index.ts',
  'forms/index': 'src/forms/index.ts',
  'main/index': 'src/main/index.ts',
};

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      dts({
        include: [
          'src/forms',
          'src/i18next',
          'src/main',
          'src/syntax-highlighter',
        ],
        exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
        outDir: 'dist', // keeps folder structure mirroring src
        entryRoot: 'src', // preserves per-package dirs
      }),
      ...(command === 'build' ? [REWRITE_MAIN_PLUGIN] : []),
    ],
    css: {
      // ensures each entry/module has its own CSS output
      devSourcemap: true,
    },
    build: {
      minify: false,
      lib: {
        entry: ENTRY_POINTS,
        formats: ['es'],
      } as LibraryOptions,
      cssCodeSplit: true,
      rollupOptions: {
        external: (id) => {
          if (
            externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`))
          ) {
            return true;
          }
          return false;
        },
        output: {
          preserveModules: true,
          entryFileNames: (chunk) => `${chunk.name}.js`,
        },
      },
      emptyOutDir: true,
    },
  };
});
