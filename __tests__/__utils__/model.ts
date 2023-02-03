import { User } from '@prisma/client';

export const generateStubFactory =
  <E>(defaultValues: E) =>
  (values: Partial<E> = {}): E => ({
    ...defaultValues,
    values,
  });

export const stubUser = generateStubFactory<User>({
  id: 12345,
  email: 'testuser@cookbook.test',
  first_name: 'Test',
  last_name: 'User',
  password: 'passwordHashHere',
  created_at: new Date(),
  updated_at: new Date(),
});
