import fs from 'fs';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { build, LibraryOptions, PluginOption, UserConfig } from 'vite';

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
  transform(code) {
    return code.replace(/@main\/[^'"]+/g, MAIN_LIBRARY_NAME);
  },
};

const entries: Array<UserConfig> = [
  {
    plugins: [
      dts({
        include: 'src/i18next',
        exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
      }),
      REWRITE_MAIN_PLUGIN,
    ],
    build: {
      lib: {
        entry: 'src/i18next/index.ts',
        fileName: () => {
          return `i18next/index.js`;
        },
      },
      emptyOutDir: true,
    },
  },
  {
    plugins: [
      dts({
        include: 'src/syntax-highlighter',
        exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
      }),
      REWRITE_MAIN_PLUGIN,
    ],
    build: {
      lib: {
        entry: 'src/syntax-highlighter/index.ts',
        fileName: () => {
          return `syntax-highlighter/index.js`;
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'syntax-highlighter/styles.css';
            }
            return assetInfo.name || 'syntax-highlighter.css';
          },
        },
      },
      emptyOutDir: false,
    },
  },
  {
    plugins: [
      dts({
        include: 'src/forms',
        exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
      }),
      REWRITE_MAIN_PLUGIN,
    ],
    build: {
      lib: {
        entry: 'src/forms/index.ts',
        fileName: () => {
          return `forms/index.js`;
        },
      },
      emptyOutDir: false,
    },
  },
  {
    plugins: [
      dts({
        include: 'src/main',
        exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
        outDir: 'dist/main',
      }),
    ],
    build: {
      lib: {
        entry: 'src/main/index.ts',
        fileName: () => {
          return `main/index.js`;
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'main/styles.css';
            }
            return assetInfo.name || 'main.css';
          },
        },
      },
      emptyOutDir: false,
    },
  },
];

const bundle = async () => {
  for (let entry of entries) {
    await build({
      plugins: [...(entry.plugins || []), react(), tsconfigPaths()],
      build: {
        minify: false,
        lib: {
          ...(entry?.build?.lib as LibraryOptions),
          formats: ['es'],
        },
        rollupOptions: {
          external: (id, ...rest) => {
            // Match exact external deps
            if (
              externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`))
            ) {
              return true;
            }

            const external = entry?.build?.rollupOptions?.external;

            if (typeof external === 'function') {
              return external?.(id, ...rest);
            }

            return false;
          },
          output: entry?.build?.rollupOptions?.output,
        },
        emptyOutDir: entry.build?.emptyOutDir,
      },
    });
  }
};

bundle();
