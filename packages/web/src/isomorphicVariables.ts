export const runtimeConfig =
  typeof window !== 'undefined' && process.browser
    ? {
        // use this on CLIENT-side (browser) apollo-client instances
        // `window.env` will be populated in the browser by the `web`
        // ssr service.
        STAGING: window.env.STAGING || false,
        API_STAGING_URL: window.env.API_STAGING_URL || null
      }
    : {
        // use this on with apollo-client instances in a node environment.
        // not yet in use, need to update how apollo-client instances
        // are constructed.
        STAGING: process.env.STAGING || false,
        API_STAGING_URL: process.env.API_STAGING_URL || null
      }
