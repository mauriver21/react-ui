import fs from 'fs';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { build } from 'vite';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { peerDependencies, devDependencies } = packageJson;
const external = [
  ...Object.keys(peerDependencies),
  ...Object.keys(devDependencies),
];

const entries = [
  {
    plugins: [dts({ include: 'src/libs/i18next/index.ts' })],
    lib: {
      entry: 'src/libs/i18next/index.ts',
      fileName: (format: string) => {
        return `libs/i18next/${format}/index.js`;
      },
    },
    emptyOutDir: true,
  },
  {
    plugins: [dts({ include: 'src/libs/syntax-highlighter/index.ts' })],
    lib: {
      entry: 'src/libs/syntax-highlighter/index.ts',
      fileName: (format: string) => {
        return `libs/syntax-highlighter/${format}/index.js`;
      },
    },
    emptyOutDir: false,
  },
  {
    plugins: [dts({ include: 'src' })],
    lib: {
      entry: 'src/index.ts',
      fileName: (format: string) => {
        return `${format}/index.js`;
      },
    },
    emptyOutDir: false,
  },
];

const bundle = async () => {
  for (let entry of entries) {
    await build({
      plugins: [...entry.plugins, react(), tsconfigPaths()],
      build: {
        minify: false,
        lib: {
          ...entry.lib,
          formats: ['es'],
        },
        rollupOptions: {
          external,
        },
        emptyOutDir: entry.emptyOutDir,
      },
    });
  }
};

bundle();
