import { generateHash, validateHash } from '../../src/service/hash';

describe('hash service', () => {
  test('hashes and validates properly', () => {
    const hash = generateHash('foobar123');

    expect(validateHash('foobar123', hash)).toBeTruthy();
    expect(validateHash('incorrect', hash)).toBeFalsy();
  });
});
