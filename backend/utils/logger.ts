import { Logger, pino } from "pino";

const logger: Logger = pino({
    level: "info",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS: yyyy-mm-dd HH:MM:ss",
            ignore: "pid,hostname",
        },
    },
});

export default logger;