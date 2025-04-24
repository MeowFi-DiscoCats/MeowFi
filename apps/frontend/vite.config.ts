import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src/app'),
      '@/components': path.resolve(__dirname, './src/shared/components'),
      '@/utils': path.resolve(__dirname, './src/shared/lib/utils'),
      '@/hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@/lib': path.resolve(__dirname, './src/shared/libs'),
      '@/data': path.resolve(__dirname, './src/shared/data'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/backend': path.resolve(__dirname, './../backend/src'),
    },
  },
  define: {
    'process.env': {},
  },
});
