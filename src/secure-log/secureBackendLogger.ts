import pino, { LoggerOptions } from 'pino'
import { backendLogger } from '..'

export { backendLogger as backendLogger } from '../loggers/backendLogger'

export const secureBackendLogger = (defaultConfig: LoggerOptions = {}) =>
    backendLogger(
        defaultConfig,
        pino.transport({ target: 'pino-roll', options: { file: '/secure-logs/secure.log', size: '128m' } }),
    )
