import { AppContext, AppMiddleware } from '../../../types';
import { generateHash, validateHash } from '../../service/hash';
import { generateJwt } from '../../service/jwt';
import { getPrismaClient } from '../../boot/db';
import { User } from '@prisma/client';

const mapUserToResponse = (user: User): object => ({
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
});

export const registerUser: AppMiddleware = async (
  ctx: AppContext
): Promise<void> => {
  const {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
  } = ctx.request.body as any;

  const existingUser = await getPrismaClient().user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser != null) {
    ctx.throw(403, 'Email already in use');
    return;
  }

  try {
    const savedUser = await getPrismaClient().user.create({
      data: {
        email,
        password: generateHash(password),
        first_name: firstName,
        last_name: lastName,
      },
    });
    const token = generateJwt(savedUser);

    ctx.status = 201;
    ctx.body = {
      ...mapUserToResponse(savedUser),
      token,
    };
  } catch (err) {
    ctx.throw(500, 'Unknown error server during registration');
    return;
  }
};

export const login: AppMiddleware = async (ctx: AppContext): Promise<any> => {
  const { email, password } = ctx.request.body as any;

  const user = await getPrismaClient().user.findFirst({
    where: {
      email,
    },
  });

  if (user == null) {
    ctx.throw(401, 'Invalid email/password');
    return;
  }

  const hash = user.password;

  if (!validateHash(password, hash)) {
    ctx.throw(401, 'Incorrect email/password');
    return;
  }

  const token = generateJwt(user);

  ctx.body = {
    ...mapUserToResponse(user),
    token,
  };
};

export const me: AppMiddleware = async (ctx: AppContext): Promise<void> => {
  ctx.body = mapUserToResponse(ctx.state.user);
};
