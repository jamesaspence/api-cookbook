import { config } from 'dotenv';
import Application from 'koa';
import winston from 'winston';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './http/routes';

config();

const { APP_PORT: port = 4000, APP_SECRET } = process.env;

if (typeof APP_SECRET !== 'string' || APP_SECRET.length < 16) {
  throw new Error(
    `"APP_SECRET" is improperly set - please ensure it is at least 16 characters long.`
  );
}

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

app.use(bodyParser());
app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  logger.debug(`Server listening at port ${port}`);
});
