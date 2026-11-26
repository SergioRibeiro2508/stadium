import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Suppress deprecation warnings from Bootstrap
        silenceDeprecations: ['global-builtin', 'import'],
        quietDeps: true,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxying
      }
    }
  },
  test: {
    environment: 'jsdom', // simula o browser nos testes
    globals: true, // describe, it, expect, vi sem imports
    setupFiles: './src/setupTests.js',
  },
  build: {
    outDir: 'build', // CRA's default build output
  },
});
