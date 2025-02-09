import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/vitest/setup-file.ts',
    include: [
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/vitest/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any,
    quasar({
      sassVariables: 'src/css/quasar.variables.scss',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any,
    tsconfigPaths(),
  ],
})
