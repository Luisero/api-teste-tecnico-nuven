import { Request, Response } from 'express';
import authService from './auth.service';
import { Prisma } from '@prisma/client';


const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};


const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    
    if (error instanceof Error && error.message === 'Invalid credentials') {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};

const me = (req: Request, res: Response) => {
    // Se a requisição chegou até aqui, o middleware já validou o token
    // e anexou o usuário em req.user.
    res.status(200).json(req.user);
};

export default { register, login, me };