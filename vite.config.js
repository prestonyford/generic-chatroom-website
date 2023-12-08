import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/count': {
        target: 'ws://localhost:4000',
        ws: true,
      },
      '/chat': {
        target: 'ws://localhost:4000',
        ws: true,
      },
    },
  },
});