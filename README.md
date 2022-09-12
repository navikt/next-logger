# next-logger

A simple logger that lets you log from both the frontend and the backend. Both will log in a JSON format that [logs.adeo.no](https://logs.adeo.no) understands. And all logs are grouped under your application (`+application:yourapp`) with correct log level.

## Getting started

### Installation

```bash
yarn add @navikt/next-logger pino
```

```bash
npm i @navikt/next-logger pino
```

### Step 1: API route
You need an API route that will receive all the log statements.

Create a new API route `/pages/api/logger.ts`, it should look like this:

```ts
export { pinoLoggingRoute as default } from '@navikt/next-logger';
```

### Step 2: Logging

Anywhere in your application where you want to log, you should import `import { logger } from '@navikt/next-logger';`, this is a [pino](https://github.com/pinojs/pino/blob/master/docs/api.md#logger) instance, use it to log, for example: `logger.warn("Uh oh")`.

### Step 3: pino-pretty

If you want pino-pretty for local development (and you probably do, simply install it and pipe it:

```bash
yarn add -D pino-pretty
```

```bash
npm i --save-dev pino-pretty
```

Simply pipe the output of your development server into pino pretty:

```
"scripts": {
  "dev": "next dev | pino-pretty",
}
```

### Step 4 (Optional): Integrating with [next-logger](https://www.npmjs.com/package/next-logger)

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

```ts
configureLogger({
    basePath: '/my/base/path',
})
```
