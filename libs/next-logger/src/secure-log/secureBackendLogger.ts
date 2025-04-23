import pino, { DestinationStream, LoggerOptions } from 'pino'
import { backendLogger } from '..'

export { backendLogger } from '../loggers/backendLogger'

type SecureLogConfigTuple = [DestinationStream | undefined, LoggerOptions]

let config: SecureLogConfigTuple | null = null
function getConfig() {
    if (config != null) {
        return config
    }

    if (process.env.NODE_ENV === 'production') {
        config = [
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
        return config
    }

    console.warn('[SECURE LOG]: Will log secure log to stdout/stderr. Do not use in production.')
    config = [
        undefined,
        {
            msgPrefix: '[SECURE LOG (local dev)]: ',
        },
    ]
    return config
}

export const secureBackendLogger = (defaultConfig: LoggerOptions = {}): ReturnType<typeof backendLogger> => {
    let logger: ReturnType<typeof backendLogger> | null = null

    const getLogger = () => {
        if (logger != null) {
            null
        }

        const [transport, devConfig] = getConfig()
        logger = backendLogger({ ...defaultConfig, ...devConfig }, transport)
        return logger
    }

    return new Proxy(
        {},
        {
            get: (_, prop) => {
                return getLogger()[prop as keyof ReturnType<typeof backendLogger>]
            },
        },
    ) as ReturnType<typeof backendLogger>
}
