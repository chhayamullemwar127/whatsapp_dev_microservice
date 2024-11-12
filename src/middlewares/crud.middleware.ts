import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/crudUtils';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split('')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = verifyToken(token);
    req.body.userId = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
