import { AppContext, AppMiddleware } from '../../types';
import { Next } from 'koa';
import {getUserFromAuthorizationHeader, JWTError} from '../../service/jwt';
import {logger} from '../../server';


export const jwtAuth: AppMiddleware = async (
  ctx: AppContext,
  next: Next
): Promise<void> => {
  const { refreshToken } = ctx.state;
  if (refreshToken != null) {
    ctx.state.user = refreshToken.user;
    return next();
  }

  try {
    ctx.state.user = await getUserFromAuthorizationHeader(ctx.header.authorization)
  } catch (err: unknown) {
    if (err instanceof JWTError) {
      ctx.throw(401);
    } else {
      logger.error(`Unexpected error translating auth header to user`, err);
      ctx.throw(500, 'Internal server error');
    }
  }

  return next();
};
