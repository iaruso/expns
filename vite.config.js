import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteCompression()
  ],
	root: 'src/',
	publicDir: '../public/',
	build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false
  }
});