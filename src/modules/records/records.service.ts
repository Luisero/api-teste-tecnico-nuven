import prisma from '../../config/prisma';
import { Prisma } from '@prisma/client';

const listByDatasetId = (datasetId: string, userId: string) => {
  return prisma.record.findMany({
    where: {
      datasetId: datasetId,
      dataset: {
        userId: userId,
      },
    },
  });
};

const searchByKeyword = (keyword: string, userId: string) => {
 
  const query = Prisma.sql`
    SELECT r.*
    FROM "records" AS r
    INNER JOIN "datasets" AS d ON r.dataset_id = d.id
    WHERE d.usuario_id = ${userId} AND r.dados_json::text ILIKE ${`%${keyword}%`}
  `;
  return prisma.$queryRaw(query);
};

export default { listByDatasetId, searchByKeyword };