import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        App: path.resolve(__dirname, 'src/App.tsx'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        data: path.resolve(__dirname, 'src/data'),
        helpers: path.resolve(__dirname, 'src/helpers'),
        layouts: path.resolve(__dirname, 'src/layouts'),
        pages: path.resolve(__dirname, 'src/pages'),
        providers: path.resolve(__dirname, 'src/providers'),
        routes: path.resolve(__dirname, 'src/routes'),
        theme: path.resolve(__dirname, 'src/theme'),
      },
    },
    optimizeDeps: {
      include: ['@emotion/styled'],
    },
    plugins: [
      tsconfigPaths(),
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
    ],
    base: '/bankdash',

    //   preview: {
    //     port: 5000,
    //   },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  };
});
