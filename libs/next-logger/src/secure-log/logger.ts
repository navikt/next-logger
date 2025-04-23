import { secureBackendLogger } from './secureBackendLogger'
import { frontendLogger as frontendLogger } from '../loggers/frontendLogger'

export const secureLogger = typeof window !== 'undefined' ? frontendLogger(true) : secureBackendLogger()
