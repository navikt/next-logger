import { NextApiRequest, NextApiResponse } from 'next'
import { backendLogger } from '../../loggers/backendLogger'

import { createLoggingApiRoute } from './loggingApiRoute'

export const pinoLoggingRoute: (req: NextApiRequest, res: NextApiResponse) => void =
    createLoggingApiRoute(backendLogger())()
