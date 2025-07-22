import prisma from '../../config/prisma';
import csv from 'csv-parser';
import { Readable } from 'stream';

interface UploadParams {
  fileBuffer: Buffer;
  originalName: string;
  userId: string;
}

const uploadAndProcessFile = async ({ fileBuffer, originalName, userId }: UploadParams) => {
  // Usamos uma transação para garantir a consistência dos dados
  return prisma.$transaction(async (tx) => {
    // 1. Cria o registro do Dataset
    const dataset = await tx.dataset.create({
      data: {
        name: originalName,
        userId: userId,
      },
    });

    // 2. Processa o buffer do arquivo CSV
    const recordsToCreate: any[] = [];
    const stream = Readable.from(fileBuffer);

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => {
          // Para cada linha do CSV, preparamos um objeto para criar um 'Record'
          recordsToCreate.push({
            datasetId: dataset.id,
            data: row, // A linha inteira vira o campo JSON 'data'
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // 3. Cria todos os records no banco de uma vez
    await tx.record.createMany({
      data: recordsToCreate,
    });

    return dataset;
  });
};

const listByUserId = (userId: string) => {
  return prisma.dataset.findMany({ where: { userId: userId } });
};

export default { uploadAndProcessFile, listByUserId };