import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/history': 'http://localhost:4000',
      '/api/history': 'http://localhost:4000',
      '/count': {
        target: 'ws://localhost:4000',
        ws: true,
      },
    },
  },
});