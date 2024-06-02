import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'clojurescript',
      configureServer(server) {
        // Watch ClojureScript files and rebuild on changes
        server.watcher.add('src/cljs/**/*');
        server.watcher.on('change', (file) => {
          if (file.endsWith('.cljs')) {
            try {
              execSync('npx shadow-cljs compile app');
            } catch (error) {
              console.error('Error compiling ClojureScript:', error);
            }
          }
        });
      },
      buildStart() {
        // Build ClojureScript files before starting the Vite build
        try {
          execSync('npx shadow-cljs compile app');
        } catch (error) {
          console.error('Error compiling ClojureScript:', error);
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/ts'),
      'cljs': path.resolve(__dirname, './public/js')
    }
  },
  // base: '/r3f-audio-visualizer/',
  assetsInclude: ['**/*.glb'],
  build: {
    outDir: 'public',
  },
  // server: {
  //   port: 3000,
  //   open: true,
  // }
});
