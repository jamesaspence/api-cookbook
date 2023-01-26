import { AppContext, AppMiddleware } from '../../types';
import { Next } from 'koa';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getPrismaClient } from '../../boot/db';

type DecodedToken = JwtPayload & {
  sub: number;
};

const getTokenFromHeader = (header: string | undefined): string | null => {
  if (header == null) {
    return null;
  }

  const expectedPrefix = 'Bearer ';

  if (!header.startsWith(expectedPrefix)) {
    return null;
  }

  return header.substring(expectedPrefix.length);
};

export const jwtAuth: AppMiddleware = async (
  ctx: AppContext,
  next: Next
): Promise<void> => {
  const { refreshToken } = ctx.state;
  if (refreshToken != null) {
    ctx.state.user = refreshToken.user;
    return next();
  }

  const rawToken = getTokenFromHeader(ctx.header.authorization);

  if (rawToken === null) {
    ctx.throw(401);
    return;
  }

  let decodedToken: DecodedToken;
  try {
    decodedToken = jwt.verify(
      rawToken,
      process.env.APP_SECRET as string
    ) as DecodedToken;
  } catch (err) {
    ctx.throw(401);
    return;
  }

  const { sub } = decodedToken;
  const user = await getPrismaClient().user.findFirst({
    where: {
      id: Number(sub),
    },
  });

  if (user == null) {
    ctx.throw(401);
    return;
  }

  ctx.state.user = user;

  return next();
};
