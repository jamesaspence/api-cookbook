import { connectToDB } from './db';

export const boot = async (): Promise<void> => {
  await connectToDB();
};
