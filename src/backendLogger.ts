import pino from 'pino'

interface LoggerConfiguration {
    secure?: boolean
}

export const logger = (loggerConfig: LoggerConfiguration = {}): pino.Logger =>
    pino(
        {
            ...loggerConfig,
            timestamp: false,
            formatters: {
                level: (label) => {
                    return { level: label }
                },
                log: (object: any) => {
                    if (object.err) {
                        // backendlogger has an Error-instance, frontendlogger has already serialized it
                        const err = object.err instanceof Error ? pino.stdSerializers.err(object.err) : object.err
                        object.stack_trace = err.stack
                        object.type = err.type
                        object.message = err.message
                        delete object.err
                    }

                    return object
                },
            },
        },
        loggerConfig.secure
            ? pino.transport({ target: 'pino-roll', options: { file: '/secure-logs/secure.log', size: '128m' } })
            : undefined,
    )
