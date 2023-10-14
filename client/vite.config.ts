import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: true, type: 'module', navigateFallback: 'index.html' },
      strategies: 'injectManifest',
      injectManifest: { globPatterns: ['**/*.{js,css,html,svg}'] },
      registerType: 'autoUpdate',
      srcDir: 'src',
      filename: 'sw.ts',
      minify: true,
      manifestFilename: 'manifest.json',
      includeAssets: ['images/*'],
      manifest: {
        theme_color: "#134e4a",
        background_color: "#134e4a",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Guess the Word!",
        short_name: "Guess!",
        description: "A 'guess the word' game",
        icons: [
          {
            src: 'images/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'images/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  build: {
    outDir: '../server/src/public',
    // outDir: './dist',
    emptyOutDir: true
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }]
  },
});
