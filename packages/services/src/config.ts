export const IS_PROD =
  !process.env.FORCE_DEV && process.env.NODE_ENV === 'production'
