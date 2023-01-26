import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const connectToDB = async (): Promise<PrismaClient> => {
  prisma = new PrismaClient();

  return getPrismaClient();
};

export const getPrismaClient = (): PrismaClient => prisma;
