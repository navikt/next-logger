import { createLoggingApiRoute } from '../../../routes/pages/loggingApiRoute'
import { secureLogger } from '../../logger'

export const pinoLoggingRoute = createLoggingApiRoute(secureLogger)
