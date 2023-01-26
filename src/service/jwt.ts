import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { User } from '@prisma/client';

const defaultOptions: SignOptions = {
  expiresIn: '1d',
};

export const generateJwt = (user: User, options: SignOptions = {}): string => {
  const { id } = user;

  return jwt.sign({}, process.env.APP_SECRET as string, {
    ...defaultOptions,
    ...options,
    subject: id.toString(),
  });
};
