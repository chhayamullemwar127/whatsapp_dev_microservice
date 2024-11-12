import jwt from 'jsonwebtoken';

const SECRET_KEY = '1234-5678-9123';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
