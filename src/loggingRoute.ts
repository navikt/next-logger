import { NextApiRequest, NextApiResponse } from 'next';
import pino, { BaseLogger } from 'pino';

import { logger } from './logger';

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>;

export const pinoLoggingRoute = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { level, ts }: pino.LogEvent = req.body;
    const label = level.label as unknown as LogLevels;
    const messages: [objOrMsg: unknown, msgOrArgs?: string] = req.body.messages;

    logger
        .child({
            x_timestamp: ts,
            x_isFrontend: true,
            x_userAgent: req.headers['user-agent'],
            x_request_id: req.headers['x-request-id'] ?? 'not-set',
        })
        [label](...messages);

    res.status(200).json({ ok: `ok` });
};
