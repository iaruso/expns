import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: './',
	root: './',
  plugins: [
    react(),
    viteCompression()
  ],
	build: {
    sourcemap: false
  },
});