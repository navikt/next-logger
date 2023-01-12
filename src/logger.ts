import pino from 'pino'

import { logger as backendLogger } from './backendLogger'
import { logger as frontendLogger } from './frontendLogger'

export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger()

export const createChildLogger = (requestId: string): pino.Logger => {
    return logger.child({ x_request_id: requestId })
}
