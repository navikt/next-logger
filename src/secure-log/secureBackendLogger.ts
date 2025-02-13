import pino, { LoggerOptions } from 'pino'
import { backendLogger } from '..'

export { backendLogger as backendLogger } from '../loggers/backendLogger'

function getConfig() {
    if (process.env.NODE_ENV === 'production') {
        return [
            pino.transport({
                target: 'pino-roll',
                options: {
                    file: '/secure-logs/secure.log',
                    size: '128m',
                    symlink: true,
                },
            }),
            {},
        ]
    }

    console.error('Using local dev logging configuration. Do not use in production.')
    return [
        undefined,
        {
            msgPrefix: '[SECURE LOG (local dev)]: ',
        },
    ]
}

export const secureBackendLogger = (defaultConfig: LoggerOptions = {}) => {
    const [transport, devConfig] = getConfig()

    return backendLogger({ ...defaultConfig, ...devConfig }, transport)
}
