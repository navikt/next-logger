import pino from 'pino'
import { getConfig } from '../config'

export const frontendLogger = (secure?: boolean): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (_, logEvent) => {
                    const config = getConfig()
                    config?.onLog?.(logEvent)

                    try {
                        await fetch(getPath(secure ?? false), {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(
                                // Hackily massage messages from exceptions into being { err: {...} } to normalize how logging looks
                                errorifyMessages(logEvent),
                            ),
                        })
                    } catch (e) {
                        console.warn(e)
                        console.warn('Unable to log to backend', logEvent)
                    }
                },
            },
        },
    })

function getPath(secure: boolean): string {
    const config = getConfig()
    if (!secure) {
        return `${config?.basePath ?? ''}${config?.apiPath ?? `/api/logger`}`
    } else {
        return `${config?.basePath ?? ''}${config?.apiPath ?? `/api/secure-logger`}`
    }
}

function errorifyMessages(logEvent: pino.LogEvent): pino.LogEvent {
    logEvent.messages = logEvent.messages.map((message) => {
        if (typeof message === 'object' && 'stack' in message) {
            return {
                err: {
                    type: message.type,
                    stack: message.stack,
                    message: message.msg ?? message.message,
                },
            }
        }
        return message
    })

    return logEvent
}
