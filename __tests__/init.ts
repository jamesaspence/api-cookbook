import { config } from 'dotenv';
import * as fs from 'fs';

export default async function () {
  const path = `${__dirname}/../.env.testing`;

  if (fs.existsSync(path)) {
    config({
      path,
    });
  }
}
