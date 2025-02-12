import { NextApiRequest, NextApiResponse } from 'next'
import pino, { BaseLogger } from 'pino'

import { logger, secureLogger } from './logger'

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

export const pinoLoggingRoute = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' })
        return
    }

    const { level, ts }: pino.LogEvent = req.body
    const label: unknown = level.label
    if (!isValidLoggingLabel(label)) {
        res.status(400).json({
            error: `Invalid label ${label}`,
        })
        return
    }

    const messages: [objOrMsg: unknown, msgOrArgs?: string] = req.body.messages
    const bindings: Record<string, string> = req.body?.bindings?.[0] ?? {}

    const _logger = req.headers['secure-log'] === 'true' ? secureLogger : logger

    _logger
        .child({
            ...bindings,
            x_timestamp: ts,
            x_isFrontend: true,
            x_userAgent: req.headers['user-agent'],
            x_request_id: req.headers['x-request-id'] ?? 'not-set',
        })
        [label](...messages)

    res.status(200).json({ ok: `ok` })
}
