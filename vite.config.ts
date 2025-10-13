import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      components: resolve(__dirname, './src/components'),
      pages: resolve(__dirname, './src/pages'),
      hooks: resolve(__dirname, './src/hooks'),
      utils: resolve(__dirname, './src/utils'),
      services: resolve(__dirname, './src/services'),
      types: resolve(__dirname, './src/types'),
      context: resolve(__dirname, './src/context'),
      reducer: resolve(__dirname, './src/reducer'),
      routes: resolve(__dirname, './src/routes'),
      graphql: resolve(__dirname, './src/graphql'),
      assets: resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // @ts-expect-error - vitest types
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        'vite.config.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});

