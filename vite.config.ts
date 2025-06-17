import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'React Starter',
        short_name: 'RStarter',
        description: 'React starter for your applications',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/img/PWA/LOGO.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/PWA/LOGO.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:js|css)/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 0, // 30 días
              },
            },
          },
          {
            urlPattern: /\/index\.html$/,
            handler: 'NetworkOnly', // Solo red desde la red para evitar errores de contenido cacheado.
          },
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
