import { NextApiRequest, NextApiResponse } from 'next'
import { createLogger } from '@navikt/pino-logger'

import { createLoggingApiRoute } from './loggingApiRoute'

export const loggingRoute: (req: NextApiRequest, res: NextApiResponse) => void = createLoggingApiRoute(createLogger())()
