import * as jwt from 'jsonwebtoken';
import {JwtPayload, SignOptions} from 'jsonwebtoken';
import { User } from '@prisma/client';
import {Nullable} from '../types';
import {getPrismaClient} from '../boot/db';

export type DecodedToken = JwtPayload & {
  sub: number;
};

export class JWTError extends Error {
  readonly #statusCode: number;
  get statusCode(): number {
    return this.#statusCode;
  }

  constructor(statusCode: number, message = 'Unauthenticated') {
    super(message);

    this.#statusCode = statusCode;
  }
}

const defaultOptions: SignOptions = {
  expiresIn: '1d',
};

const getTokenFromHeader = (header?: string): Nullable<string> => {
  if (header == null) {
    return null;
  }

  const expectedPrefix = 'Bearer ';

  if (!header.startsWith(expectedPrefix)) {
    return null;
  }

  return header.substring(expectedPrefix.length);
};

export const getUserFromAuthorizationHeader = async (header?: string): Promise<User> => {
  const rawToken = getTokenFromHeader(header);

  if (rawToken === null) {
    throw new JWTError(401);
  }

  let decodedToken: DecodedToken;
  try {
    decodedToken = jwt.verify(
      rawToken,
      process.env.APP_SECRET as string
    ) as DecodedToken;
  } catch (err) {
    throw new JWTError(401);
  }

  const { sub } = decodedToken;
  const user = await getPrismaClient().user.findFirst({
    where: {
      id: Number(sub),
    },
  });

  if (user == null) {
    throw new JWTError(401);
  }

  return user;
}

export const generateJwt = (user: User, options: SignOptions = {}): string => {
  const { id } = user;

  return jwt.sign({}, process.env.APP_SECRET as string, {
    ...defaultOptions,
    ...options,
    subject: id.toString(),
  });
};
