import pino, { BaseLogger } from 'pino'

import { logger } from './logger'

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>

const validLogLevels: Record<LogLevels, LogLevels> = {
    error: 'error',
    debug: 'debug',
    fatal: 'fatal',
    info: 'info',
    trace: 'trace',
    silent: 'silent',
    warn: 'warn',
} as const

function isValidLoggingLabel(label: unknown): label is LogLevels {
    return typeof label === 'string' && label in validLogLevels
}

export const POSTLoggingRouteHandler = async (request: Request): Promise<Response> => {
    const body = await request.json()
    const { level, ts }: pino.LogEvent = body
    const label: unknown = level.label
    if (!isValidLoggingLabel(label)) {
        return Response.json(
            {
                error: `Invalid label ${label}`,
            },
            { status: 400 },
        )
    }

    const messages: [objOrMsg: unknown, msgOrArgs?: string] = body.messages
    const bindings: Record<string, string>[] = body.bindings ?? []

    logger
        .child({
            ...bindings,
            x_timestamp: ts,
            x_isFrontend: true,
            x_userAgent: request.headers.get('user-agent'),
            x_request_id: request.headers.get('x-request-id') ?? 'not-set',
        })
        [label](...messages)

    return Response.json({ ok: `ok` })
}
