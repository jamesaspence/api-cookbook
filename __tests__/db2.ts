import { resetDatabase } from './__utils__/database';
import { connectToDB, getPrismaClient } from '../src/boot/db';
import { User } from '@prisma/client';

beforeAll(async () => {
  await connectToDB();
});

afterEach(async () => {
  await resetDatabase();
});

describe('db 2 tests', () => {
  test('foo', () => {
    expect(true).toBeTruthy();
  });

  test('that a second test is not immensely slow', async () => {
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
