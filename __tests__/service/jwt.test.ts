import { decodeJwt, generateJwt } from '../../src/service/jwt';
import { stubUser } from '../__utils__/model';

describe('jwt service', () => {
  test('generates a jwt properly', () => {
    const user = stubUser();
    const jwt = generateJwt(user);

    expect(jwt).not.toBeNull();
    const decoded = decodeJwt(jwt);

    expect(decoded).not.toBeNull();
  });

  test('will not decode a jwt with a different secret', () => {
    const user = stubUser();
    const jwt = generateJwt(user);

    const appSecret = process.env.APP_SECRET;
    process.env.APP_SECRET = `${appSecret}withNewCharacters`;

    expect(() => {
      decodeJwt(jwt);
    }).toThrowError();

    // Set this app secret back to the original
    process.env.APP_SECRET = appSecret;

    expect(() => {
      decodeJwt(jwt);
    }).not.toThrowError();
  });
});
