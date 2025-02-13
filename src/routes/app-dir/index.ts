import { backendLogger } from '../../loggers/backendLogger'

import { createLoggingRouteHandler } from './loggingRouteHandler'

export const POST: (request: Request) => Promise<Response> = createLoggingRouteHandler(backendLogger())()
