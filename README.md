# next-logger

A simple logger that lets you log from both the frontend and the backend. Both show up in [logs.adeo.no](https://logs.adeo.no) under `+application:yourapp` with correct log level.

## Getting started

### Step 1: API route
You need an API route that will receive all the log statements.

Create a new API route `/pages/api/logger.ts`, it should look like this:

```ts
export { pinoLoggingRoute as default } from '@navikt/next-logger';
```

### Step 2: Logging

Anywhere in your application where you want to log, you should import `import { logger } from '@navikt/next-logger';`, this is a [pino](https://github.com/pinojs/pino/blob/master/docs/api.md#logger) instance, use it to log, for example: `logger.warn("Uh oh")`.

### Step 3 (Optional): Integarting with [next-logger](https://www.npmjs.com/package/next-logger)

The pino configuration from this library can be shared with [next-logger](https://www.npmjs.com/package/next-logger).

Simply create a `next-logger.config.js` in the root of your project, and re-export the logging config as following:

```js
const { backendLogger } = require('@navikt/next-logger');

module.exports = {
    logger: backendLogger,
};

```
