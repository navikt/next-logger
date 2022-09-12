import pino from 'pino';

import { logger as backendLogger } from './next-logger.config';

const getFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (level, logEvent) => {
                    try {
                        await fetch('/api/logger', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(logEvent),
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn('Unable to log to backend', logEvent);
                    }
                },
            },
        },
    });

const createBackendLogger = (): pino.Logger => backendLogger();

export const logger = typeof window !== 'undefined' ? getFrontendLogger() : createBackendLogger();

export const createChildLogger = (requestId: string): pino.Logger => {
    return logger.child({ x_request_id: requestId });
};
