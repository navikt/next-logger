import { NextApiRequest, NextApiResponse } from 'next';
import pino, { BaseLogger } from 'pino';

import { logger } from './logger';

type LogLevels = Exclude<keyof BaseLogger, 'string' | 'level'>;

export const pinoLoggingRoute = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { level, ts, ...rest }: pino.LogEvent = req.body;

    rest.messages.forEach((message) => {
        const log = typeof message === 'string' ? { message } : message;
        const label = level.label as unknown as LogLevels;
        logger[label]({
            ...log,
            x_timestamp: ts,
            x_isFrontend: true,
            x_userAgent: req.headers['user-agent'],
            x_request_id: req.headers['x-request-id'] ?? 'not-set',
        });
    });

    res.status(200).json({ ok: `ok` });
};
