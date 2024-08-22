import * as jwt from 'jsonwebtoken';

export const isValidJWT = async (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET ?? '';

  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, function (err, payload) {
      if (err) resolve(false);
      return resolve(payload);
    });
  });
};
