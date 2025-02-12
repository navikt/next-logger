import pino from 'pino'
import { getConfig } from './config'

export const logger = (secure?: boolean): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (_, logEvent) => {
                    const config = getConfig()
                    config?.onLog?.(logEvent)

                    try {
                        await fetch(`${config?.basePath ?? ''}${config?.apiPath ?? `/api/logger`}`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                ...(secure ? { 'secure-log': 'true' } : {}),
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
