import { defineConfig  } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { visualizer } from "rollup-plugin-visualizer";


// https://vitejs.dev/config/
export default defineConfig({
  base:'',
  plugins: [svelte(), visualizer()],
  renderBuiltUrl(filename, { hostType }) {
    if (hostType === 'js') {
      return { runtime: `window.__toCdnUrl(${JSON.stringify(filename)})` }
    } else {
      return { relative: true }
    }
  },
  build: {
    outDir: './dist/basic-site',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

	compilerOptions: {
		runes: true // Which could also be false if you want to force the Svelte 4 compiler/syntax
	}
})
