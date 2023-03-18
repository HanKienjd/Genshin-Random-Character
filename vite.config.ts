import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin(
    {
      babel: {
        plugins: [
          [
            "@locator/babel-jsx/dist",
            {
              env: "development",
            },
          ],
        ],
      },
    }
  )],
  build: {
    target: 'esnext',
  },
  server: {
    host: '0.0.0.0',
    open: true,
    port: 8000,
  },
});
