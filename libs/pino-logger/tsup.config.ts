import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts', 'src/secure-log/index.ts'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
})
