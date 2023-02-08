import { exec } from 'child_process';
import { Nullable } from '../../src/types';
import { connectToDB, getPrismaClient } from '../../src/boot/db';

type CommandOutput = {
  error: Nullable<Error>;
  stdout: string | Buffer;
  stderr: string | Buffer;
};

export const initializeMigrations = async (): Promise<CommandOutput> => {
  await connectToDB();

  return new Promise<CommandOutput>((resolve, reject) => {
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

      resolve({
        error,
        stdout,
        stderr,
      });
    });
  });
};

export const resetDatabase = async (): Promise<void> => {
  await connectToDB();

  const client = getPrismaClient();
  await client.user.deleteMany();
};
