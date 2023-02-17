import { exec } from 'child_process';
import { Nullable } from '../../src/types';
import { connectToDB, getPrismaClient } from '../../src/boot/db';

type CommandOutput = {
  error: Nullable<Error>;
  stdout: string | Buffer;
  stderr: string | Buffer;
};

let migrationsRun = false;

export const setupDatabase = async (
  forceRun = false
): Promise<CommandOutput | void> => {
  await connectToDB();

  return new Promise<CommandOutput | void>((resolve, reject) => {
    if (migrationsRun && !forceRun) {
      resolve();
    }

    const rootPath = `${__dirname}/../../`;

    const command = `cd ${rootPath} && DB_URL=${process.env.DB_URL} yarn prisma migrate reset --force`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({
          error,
          stdout,
          stderr,
        });
      }

      migrationsRun = true;
      resolve();
    });
  });
};

export const resetDatabase = async (): Promise<void> => {
  await connectToDB();

  const client = getPrismaClient();
  await client.user.deleteMany();
};
