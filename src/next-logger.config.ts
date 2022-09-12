import pino from 'pino';

export const logger = (defaultConfig = {}): pino.Logger =>
    pino({
        ...defaultConfig,
        timestamp: false,
        formatters: {
            level: (label) => {
                return { level: label };
            },
            log: (object: any) => {
                if ('err' in object) {
                    object.stack = object.err.stack;
                }
                return object;
            },
        },
    });
