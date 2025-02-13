import { createLoggingRouteHandler } from '../../../routes/app-dir/loggingRouteHandler'
import { secureLogger } from '../../logger'

export const POST = createLoggingRouteHandler(secureLogger)
