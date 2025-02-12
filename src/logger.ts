import pino from 'pino'

import { logger as backendLogger } from './backendLogger'
import { logger as frontendLogger } from './frontendLogger'

export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger()

export const secureLogger = typeof window !== 'undefined' ? frontendLogger(true) : backendLogger({ secure: true })

export const createChildLogger = (requestId: string): pino.Logger => {
    return logger.child({ x_request_id: requestId })
}
