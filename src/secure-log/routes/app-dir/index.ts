import { createLoggingRouteHandler } from '../../../routes/app-dir/loggingRouteHandler'
import { secureBackendLogger } from '../../secureBackendLogger'

export const POST = createLoggingRouteHandler(secureBackendLogger())
