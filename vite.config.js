import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    svelte(),
    // visualizer(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '❤️‍🔥 Svelte ❤️‍🔥',
        short_name: 'BasicSiteWithSvelte5',
        description: '❤️‍🔥 Svelte ❤️‍🔥',
        theme_color: '#0A65BA',
        background_color: '#333',
        icons: [
          {
            src: 'svelte.svg',
            sizes: '144x144',
            type: 'image/svg'
          },
          {
            src: 'svelte.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: 'svelte.svg',
            sizes: '512x512',
            type: 'image/svg'
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      workbox: {
        runtimeCaching: [{
          handler: 'NetworkOnly',
          urlPattern: /\/assets\/.*\/*.json/,
          method: 'POST',
          options: {
            backgroundSync: {
              name: 'static_assets_json',
              options: {
                maxRetentionTime: 24 * 60,
              },
            },
          },
        }],
      },
    })
  ],
  renderBuiltUrl (filename, { hostType }) {
    if (hostType === 'js') {
      return { runtime: `window.__toCdnUrl(${JSON.stringify(filename)})` }
    } else {
      return { relative: true }
    }
  },
  build: {
    outDir: './dist/basic-site'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },

  compilerOptions: {
    runes: true // Which could also be false if you want to force the Svelte 4 compiler/syntax
  }
})
