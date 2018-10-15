export const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        // use this on CLIENT-side (browser) apollo-client instances
        // `window.env` will be populated in the browser by the `web`
        // ssr service.
        WS_URI: window.env.API_STAGING_URL
      }
    : {
        // use this on with apollo-client instances in a node environment.
        // not yet in use, need to update how apollo-client instances
        // are constructed.
        WS_URI: process.env.API_STAGING_URL
      }
