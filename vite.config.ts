import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // QUAN TRỌNG: Đường dẫn này phải khớp với tên repository trên GitHub
  base: '/Andy.github.io/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});