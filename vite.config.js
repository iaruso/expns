import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import mkcert from 'vite-plugin-mkcert'
import preload from 'vite-plugin-preload';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    compression(),
    //mkcert(),
    preload()
  ],
  server: {
    host: true,
  },
	root: 'src/',
	publicDir: '../public/',
	build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false
  }
});