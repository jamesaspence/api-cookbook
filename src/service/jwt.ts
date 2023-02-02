import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { User } from '@prisma/client';

const defaultOptions: SignOptions = {
  expiresIn: '1d',
};

type DecodedToken = JwtPayload & {
  sub: number;
};

export const generateJwt = (user: User, options: SignOptions = {}): string => {
  const { id } = user;

  return jwt.sign({}, process.env.APP_SECRET as string, {
    ...defaultOptions,
    ...options,
    subject: id.toString(),
  });
};

export const decodeJwt = (rawToken: string): DecodedToken =>
  jwt.verify(rawToken, process.env.APP_SECRET as string) as DecodedToken;
