import { defineConfig } from 'tsup'

import { sharedConfig } from '../tsup.common'

export default defineConfig({
    ...sharedConfig,
    entry: [
        'src/index.ts',
        'src/app-dir/index.ts',
        'src/pages/index.ts',
        'src/secure-log/index.ts',
        'src/secure-log/app-dir/index.ts',
        'src/secure-log/pages/index.ts',
    ],
})
