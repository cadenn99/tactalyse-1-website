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
    ],
});
