import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: './vitest.setup.ts',
        exclude: [...configDefaults.exclude],
        environment: 'jsdom', // or 'jsdom', 'node',
        globals: true,
        testTimeout: 60 * 1000, // 1 minute
    },
})
