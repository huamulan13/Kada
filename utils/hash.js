import crypto from 'crypto';

export const getHash = (password) => {
  return crypto.createHash('sha1').update(password).digest("hex"); //
};