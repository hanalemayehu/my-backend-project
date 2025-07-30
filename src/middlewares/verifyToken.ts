// /middlewares/verifyToken.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded; // store user info on request
    next(); // call the handler
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
