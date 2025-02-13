import { NextApiRequest, NextApiResponse } from 'next'

import { Metadata } from '../../../routes/metadata'
import { createLoggingApiRoute } from '../../../routes/pages/loggingApiRoute'
import { secureLogger } from '../../logger'

const loggingRoute = createLoggingApiRoute(secureLogger)

export const pinoLoggingRoute: (req: NextApiRequest, res: NextApiResponse) => void =
    createLoggingApiRoute(secureLogger)()

export type MetadataFn = (req: NextApiRequest) => Promise<Metadata> | Metadata
export const withMetadata = (metadataFn: MetadataFn) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const metadata = await metadataFn(req)

        loggingRoute(metadata)(req, res)
    }
}
