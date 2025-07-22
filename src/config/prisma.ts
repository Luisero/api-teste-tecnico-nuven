import { PrismaClient } from '@prisma/client';

// Cria uma única instância do PrismaClient
const prisma = new PrismaClient();

// Exporta essa instância para que outros arquivos possam importá-la
export default prisma;