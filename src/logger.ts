import pino from 'pino';

import { logger as backendLogger } from './backendLogger';
import { logger as frontendLogger } from './frontendLogger';

export interface LoggerConfiguration {
    basePath?: string;
    apiPath?: string;
}

let config: LoggerConfiguration | null = null;

export const configureLogger = (configuration: LoggerConfiguration) => {
    config = configuration;
};

export const logger = typeof window !== 'undefined' ? frontendLogger(config) : backendLogger();

export const createChildLogger = (requestId: string): pino.Logger => {
    return logger.child({ x_request_id: requestId });
};
