import prisma from '../../config/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 


type RegisterUserData = Omit<User, 'id'>;

const register = async (userData: RegisterUserData): Promise<Omit<User, 'password'>> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    },
  });
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};


const login = async (loginData: Pick<User, 'email' | 'password'>) => {
  
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  });

  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  
  const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

  
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  
  const token = jwt.sign(
    { sub: user.id }, 
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' } 
  );

  return { token };
};


export default { register, login }; 