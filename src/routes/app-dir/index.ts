import { backendLogger } from '../../loggers/backendLogger'

import { createLoggingRouteHandler } from './loggingRouteHandler'

export const POST = createLoggingRouteHandler(backendLogger())
