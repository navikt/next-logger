import { createLogger } from '@navikt/pino-logger'

import { createLoggingRouteHandler } from './loggingRouteHandler'

export const POST: (request: Request) => Promise<Response> = createLoggingRouteHandler(createLogger())()
