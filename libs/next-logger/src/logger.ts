import pino from 'pino'

import { backendLogger as backendLogger } from './loggers/backendLogger'
import { frontendLogger as frontendLogger } from './loggers/frontendLogger'

export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger()

export const createChildLogger = (requestId: string): pino.Logger => {
    return logger.child({ x_request_id: requestId })
}
