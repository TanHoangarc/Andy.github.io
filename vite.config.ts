import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sử dụng đường dẫn tương đối './' để đảm bảo web chạy được trên mọi thư mục con
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});