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

if you want to use the secure logger, you also need to install `pino-roll`:

```bash
yarn add pino-roll
```

```bash
npm i pino-roll
```

### Step 1: API route

You need an API route that will receive all the log statements.

**For app dir:**

Create a new API route `/app/api/logger/route.ts`, it should look like this:

```ts
export { POST } from '@navikt/next-logger/app-dir'
```

**For pages dir:**

Create a new API route `/pages/api/logger.ts`, it should look like this:

```ts
export { pinoLoggingRoute as default } from '@navikt/next-logger/pages';
```

### Step 2: Logging

Anywhere in your application where you want to log, you should import `import { logger } from '@navikt/next-logger';`, this is a [pino](https://github.com/pinojs/pino/blob/master/docs/api.md#logger) instance, use it to log, for example: `logger.warn("Uh oh")`.
Alternatively, if you need secure logging, use `ìmport { secureLogger } from '@navikt/next-logger';`. See [Securelogs](#Securelogs) for more information on secure logging.

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
const { backendLogger } = require('@navikt/next-logger')

module.exports = {
    logger: backendLogger,
}
```

## Configuration

### App Dir

You want this configuration to execute as early as possible, but on the actual client. Typically in your app-dir app, you will have for example a `<Providers>`-client that is `"use client"`-enabled.

On the _root_ of any `"use client"`-enabled file that wraps your root layout.tsx, you can configure the library, for example:

```ts
"use client"

configureLogger({
    basePath: '/my/base/path',
})

export const MyProviders() {
   ...
}
```

### Pages

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

## Securelogs

If you want to log sensitive information, you can use the `secureLogger` function. This will instead of logging to stdout log to a file on /secure-logs. 
This requires some setup, see [nais docs](https://doc.nais.io/observability/logging/how-to/enable-secure-logs/) for how to enable secure logging in your app.

The log file is setup with [pino-roll](https://www.npmjs.com/package/pino-roll) for rolling the logs based on file size.

Using secure logger as an isomorphic logger requires an additonal API-route in your next app, the configuration is similar to the primary logger route.

**For app dir:**

Create a new API route `/app/api/secure-logger/route.ts`, it should look like this:

```ts
export { POST } from '@navikt/next-logger/secure-log/app-dir'
```

**For pages dir:**

Create a new API route `/pages/api/secure-logger.ts`, it should look like this:

```ts
export { pinoLoggingRoute as default } from '@navikt/next-logger/secure-log/pages';
```

## Breaking changes: migrating to v2

The only breaking change is that the paths for the API routes have been updated.

### App Dir

`app/api/logger/route.ts`:

```diff
- export { POSTLoggingRouteHandler as POST } from '@navikt/next-logger'
+ export { POST } from '@navikt/next-logger/app-dir'
```
### Pages

`pages/api/logger/route.ts`:

```diff
- export { pinoLoggingRoute as default } from '@navikt/next-logger'
+ export { pinoLoggingRoute as default } from '@navikt/next-logger/pages'
```

If you want to use the new secureLogger feature, refer to the Securelogs docs above.
