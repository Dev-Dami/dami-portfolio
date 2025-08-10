import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dami-portfolio/', // EXACT repo name here
  plugins: [react()],
});