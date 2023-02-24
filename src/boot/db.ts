import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const connectToDB = async (reset = false): Promise<PrismaClient> => {
  if (prisma && !reset) {
    // eslint-disable-next-line no-console
    console.log('prisma already exists, pulling previous');
    return getPrismaClient();
  } else if (prisma) {
    await prisma.$disconnect();
  }

  prisma = new PrismaClient();

  return getPrismaClient();
};

export const getPrismaClient = (): PrismaClient => prisma;
