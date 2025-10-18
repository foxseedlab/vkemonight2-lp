import cloudflare from '@astrojs/cloudflare';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://vkemonight2.kemoin.com',

  vite: {
    plugins: [tailwindcss()],

    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['motion/react'],
          },
        },
      },
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'motion/react', 'react-use'],
    },

    ssr: {
      noExternal: ['react-use'],
    },
  },

  integrations: [
    react(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'sendGAEvent'],
        debug: false,
      },
    }),
    sitemap(),
  ],

  adapter: cloudflare({
    workerEntryPoint: {
      path: './src/worker.ts',
      namedExports: ['createExports'],
    },
    platformProxy: {
      enabled: true,
    },
  }),
});
