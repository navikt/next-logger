import { NextApiRequest, NextApiResponse } from 'next'
import { backendLogger } from '../../loggers/backendLogger'

import { createLoggingApiRoute } from './loggingApiRoute'

export const loggingRoute: (req: NextApiRequest, res: NextApiResponse) => void =
    createLoggingApiRoute(backendLogger())()
