import { connectToDB, getPrismaClient } from '../src/boot/db';
import { User } from '@prisma/client';
import { setupDatabase, resetDatabase } from './__utils__/database';

beforeAll(async () => {
  await connectToDB();
});

afterEach(async () => {
  await resetDatabase();
});

describe('db test', () => {
  test('that the database connection works', async () => {
    const client = getPrismaClient();

    await client.user.create({
      data: {
        first_name: 'Foo',
        last_name: 'Bar',
        email: 'test@testuser.cookbook',
        password: 'password123',
      },
    });

    const user = (await client.user.findFirstOrThrow({
      where: {
        email: 'test@testuser.cookbook',
      },
    })) as User;

    expect(user).not.toBeNull();
    expect(user.email).toEqual('test@testuser.cookbook');
  });

  test('that the database connection works2', async () => {
    const client = getPrismaClient();

    await client.user.create({
      data: {
        first_name: 'Foo',
        last_name: 'Bar',
        email: 'test@testuser.cookbook',
        password: 'password123',
      },
    });

    const user = (await client.user.findFirstOrThrow({
      where: {
        email: 'test@testuser.cookbook',
      },
    })) as User;

    expect(user).not.toBeNull();
    expect(user.email).toEqual('test@testuser.cookbook');
  });

  test('that the database connection works3', async () => {
    const client = getPrismaClient();

    await client.user.create({
      data: {
        first_name: 'Foo',
        last_name: 'Bar',
        email: 'test@testuser.cookbook',
        password: 'password123',
      },
    });

    const user = (await client.user.findFirstOrThrow({
      where: {
        email: 'test@testuser.cookbook',
      },
    })) as User;

    expect(user).not.toBeNull();
    expect(user.email).toEqual('test@testuser.cookbook');
  });

  test('that the database connection works4', async () => {
    const client = getPrismaClient();

    await client.user.create({
      data: {
        first_name: 'Foo',
        last_name: 'Bar',
        email: 'test@testuser.cookbook',
        password: 'password123',
      },
    });

    const user = (await client.user.findFirstOrThrow({
      where: {
        email: 'test@testuser.cookbook',
      },
    })) as User;

    expect(user).not.toBeNull();
    expect(user.email).toEqual('test@testuser.cookbook');
  });
});
