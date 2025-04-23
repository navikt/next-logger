import pino from 'pino'
import { createLogger as backendLogger } from '@navikt/pino-logger'

import { frontendLogger as frontendLogger } from './loggers/frontendLogger'

export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger()

export const createChildLogger = (requestId: string): pino.Logger => {
    return logger.child({ x_request_id: requestId })
}
