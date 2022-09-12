import pino from 'pino';

import { logger as backendLogger } from './next-logger.config';

interface LoggerConfiguration {
    basePath?: string;
    apiPath?: string;
}

let config: LoggerConfiguration | null = null;
const configureLogger = (configuration: LoggerConfiguration) => {
    config = configuration
};

const getFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (_, logEvent) => {
                    try {
                        await fetch(`${config?.basePath ?? ''}${config?.apiPath ?? '/api/logger'}`, {
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


configureLogger({
    basePath: '/my/base/path',
    apiPath: '/api/other-logger',
})