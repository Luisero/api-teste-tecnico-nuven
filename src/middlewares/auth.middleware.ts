import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' }); // 401 Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    const userId = decoded.sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true } // Seleciona apenas os campos seguros
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    req.user = user; 
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' }); // 403 Forbidden
  }
};