import winston from 'winston'

/**
 * Winston logger configuration
 */
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.logstash(),
            ),
        }),
        new winston.transports.File({
            level: 'error',
            filename: "./logs/error.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.logstash(),
            ),
        }),
    ],
});
