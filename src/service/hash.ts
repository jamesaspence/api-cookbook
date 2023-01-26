import bcrypt from 'bcryptjs';

export const generateHash = (text: string): string =>
  bcrypt.hashSync(text, bcrypt.genSaltSync(10));

export const validateHash = (text: string, hash: string): boolean =>
  bcrypt.compareSync(text, hash);
