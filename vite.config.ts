import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const pathSrc = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "${pathSrc}/stylesheets/abstracts/mixins";
              @import "${pathSrc}/stylesheets/abstracts/variables";
            `,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components/index'),
      hooks: path.resolve(__dirname, './src/hooks/index'),
      features: path.resolve(__dirname, './src/features/index'),
    },
  },
});
