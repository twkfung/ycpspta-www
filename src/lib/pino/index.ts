import pino from "pino"

export const logger = pino({
  nestedKey: "payload",
  level: process.env.NEXT_LOGGER_LEVEL || "info",
  browser: {
    asObject: true,
  },
})

logger.info(`[Pino] Logger version is ${logger.version}`)
logger.info(`[Pino] Logger level is ${logger.level}`)
