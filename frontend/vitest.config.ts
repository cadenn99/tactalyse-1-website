/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ["vitestSetup.ts"],
    coverage: {
      exclude: [
        '**/__mocks__/**/*',
        '**/__test__/**/*',
      ],
      provider: 'istanbul', // or 'c8'
      reporter: ['lcov', 'html'],
    }
  }
})