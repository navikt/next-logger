import { backendLogger } from '../../loggers/backendLogger'

import { createLoggingApiRoute } from './loggingApiRoute'

export const pinoLoggingRoute = createLoggingApiRoute(backendLogger())
