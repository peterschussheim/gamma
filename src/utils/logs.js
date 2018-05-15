import chalk from 'chalk'
import debug from 'debug'

const logger = debug('app')

export const log = (...args) => logger(chalk.greenBright('log:'), ...args)
export const logInfo = (...args) => logger(chalk.cyanBright('info:'), ...args)
export const logDebug = (...args) =>
  logger(chalk.yellowBright('debug:'), ...args)
export const logError = (...args) => logger(chalk.redBright('error:'), ...args)
