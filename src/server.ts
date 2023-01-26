import { config } from 'dotenv';
import Application from 'koa';
import winston from 'winston';

config();

export const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { services: 'cookbook-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug',
    }),
  ],
});

export const app = new Application();

app.use(ctx => {
  ctx.body = {
    name: 'Cookbook API',
  };
});

const { APP_PORT: port = 4000 } = process.env;

app.listen(port, () => {
  logger.debug(`Server listening at port ${port}`);
});
