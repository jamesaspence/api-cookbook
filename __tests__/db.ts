describe('db test', () => {
  test('that the stub works', () => {
    expect(true).toBeTruthy();
  });
});

/*
 * I was attempting to get database tests working in a way where an individual test could request a fresh database.
 * This would run the migrations if needed, and otherwise reset the data, allowing a clean slate before (and after) the test.
 * I believe this might need to wait until after prisma adds support for programmatic migrations.
 */

// beforeAll(async () => {
//   await connectToDB();
// });
//
// afterEach(async () => {
//   await resetDatabase();
// });
//
// describe('db test', () => {
//   test('that the database connection works', async () => {
//     const client = getPrismaClient();
//
//     await client.user.create({
//       data: {
//         first_name: 'Foo',
//         last_name: 'Bar',
//         email: 'test@testuser.cookbook',
//         password: 'password123',
//       },
//     });
//
//     const user = (await client.user.findFirstOrThrow({
//       where: {
//         email: 'test@testuser.cookbook',
//       },
//     })) as User;
//
//     expect(user).not.toBeNull();
//     expect(user.email).toEqual('test@testuser.cookbook');
//   });
//
//   test('that the database connection works2', async () => {
//     const client = getPrismaClient();
//
//     await client.user.create({
//       data: {
//         first_name: 'Foo',
//         last_name: 'Bar',
//         email: 'test@testuser.cookbook',
//         password: 'password123',
//       },
//     });
//
//     const user = (await client.user.findFirstOrThrow({
//       where: {
//         email: 'test@testuser.cookbook',
//       },
//     })) as User;
//
//     expect(user).not.toBeNull();
//     expect(user.email).toEqual('test@testuser.cookbook');
//   });
//
//   test('that the database connection works3', async () => {
//     const client = getPrismaClient();
//
//     await client.user.create({
//       data: {
//         first_name: 'Foo',
//         last_name: 'Bar',
//         email: 'test@testuser.cookbook',
//         password: 'password123',
//       },
//     });
//
//     const user = (await client.user.findFirstOrThrow({
//       where: {
//         email: 'test@testuser.cookbook',
//       },
//     })) as User;
//
//     expect(user).not.toBeNull();
//     expect(user.email).toEqual('test@testuser.cookbook');
//   });
//
//   test('that the database connection works4', async () => {
//     const client = getPrismaClient();
//
//     await client.user.create({
//       data: {
//         first_name: 'Foo',
//         last_name: 'Bar',
//         email: 'test@testuser.cookbook',
//         password: 'password123',
//       },
//     });
//
//     const user = (await client.user.findFirstOrThrow({
//       where: {
//         email: 'test@testuser.cookbook',
//       },
//     })) as User;
//
//     expect(user).not.toBeNull();
//     expect(user.email).toEqual('test@testuser.cookbook');
//   });
// });
