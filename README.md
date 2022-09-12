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

## Configuration

If your application is using a base path, or you want to have your logger on a different API-route, you can configure the logger.

In your `_app.tsx`, on root in the file, you can use `configureLogger` as such:

```ts
configureLogger({
    basePath: '/my/base/path',
    apiPath: '/api/other-logger',
})
```

Or if you only want to change the base path:

configureLogger({
    basePath: '/my/base/path',
})
