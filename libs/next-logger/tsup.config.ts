import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/app-dir/index.ts',
        'src/pages/index.ts',
        'src/secure-log/index.ts',
        'src/secure-log/app-dir/index.ts',
        'src/secure-log/pages/index.ts',
    ],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
})
