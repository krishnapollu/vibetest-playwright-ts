import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/test.log' })
  ]
});

export function logApiInteraction({
  method,
  url,
  requestHeaders,
  requestBody,
  responseStatus,
  responseHeaders,
  responseBody
}: {
  method: string;
  url: string;
  requestHeaders?: any;
  requestBody?: any;
  responseStatus: number;
  responseHeaders?: any;
  responseBody?: any;
}) {
  logger.info(`API REQUEST: ${method} ${url}\nHeaders: ${JSON.stringify(requestHeaders)}\nBody: ${JSON.stringify(requestBody)}`);
  logger.info(`API RESPONSE: Status: ${responseStatus}\nHeaders: ${JSON.stringify(responseHeaders)}\nBody: ${JSON.stringify(responseBody)}`);
}

export default logger; 