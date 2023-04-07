import { config } from 'dotenv';
import Application, { Next } from 'koa';
import winston from 'winston';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './http/routes';
import { boot } from './boot';
import { AppContext } from './types';
import helmet from 'koa-helmet';
import {ApolloServer} from '@apollo/server';
import * as http from 'http';
import {koaMiddleware} from '@as-integrations/koa';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {getUserFromAuthorizationHeader} from './service/jwt';

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

boot().then(async () => {
  const typeDefs = `#graphql
    type Query {
        hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'world',
    },
  };

  const httpServer = http.createServer(app.callback());
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();

  // General error handler, convert errors to JSON payloads
  app.use((ctx: AppContext, next: Next): Promise<void> => {
    return next().catch(err => {
      const {
        status = 500,
        message = 'Internal server error',
        data = {},
      } = err;

      ctx.status = status;
      ctx.body = {
        error: message,
        ...data,
      };

      ctx.app.emit('error', err, ctx);
    });
  });

  app.use(helmet());

  app.use(bodyParser());
  app.use(cors());

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(koaMiddleware(apolloServer, {
    context: async ({ ctx }) => {
      try {
        return {
          user: await getUserFromAuthorizationHeader(ctx.header.authorization),
        };
      } catch (err: unknown) {
        return { user: null };
      }
    },
  }))

  httpServer.listen({ port }, () => {
    logger.debug(`Server listening at port ${port}`);
  });
});
