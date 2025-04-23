import { createLoggingRouteHandler } from '../../../routes/app-dir/loggingRouteHandler'
import { Metadata } from '../../../routes/metadata'
import { secureLogger } from '../../logger'

const routeHandler = createLoggingRouteHandler(secureLogger)

export const POST: (request: Request) => Promise<Response> = routeHandler()

export type MetadataFn = (req: Request) => Promise<Metadata> | Metadata
export const withMetadata = (metadataFn: MetadataFn) => {
    return async (req: Request): Promise<Response> => {
        const metadata = await metadataFn(req)

        return await routeHandler(metadata)(req)
    }
}
