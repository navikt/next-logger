import { createLoggingApiRoute } from '../../../routes/pages/loggingApiRoute'
import { secureBackendLogger } from '../../secureBackendLogger'

export const pinoLoggingRoute = createLoggingApiRoute(secureBackendLogger())
