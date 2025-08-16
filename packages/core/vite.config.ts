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
    build: {
      minify: false,
      lib: {
        entry: [
          'src/forms/index.ts',
          'src/i18next/index.ts',
          'src/main/index.ts',
          'src/syntax-highlighter/index.ts',
        ],
        formats: ['es'],
      } as LibraryOptions,
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
          preserveModulesRoot: 'src',
          entryFileNames: (chunk) => `${chunk.name}.js`,
          assetFileNames: 'styles.css',
        },
      },
      emptyOutDir: true,
    },
  };
});
