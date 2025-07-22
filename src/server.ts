import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import datasetRoutes from './modules/datasets/datasets.routes';
import recordRoutes from './modules/records/records.routes';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
// --- Imports para o Swagger ---
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger-output.json';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/', (req, res) => {
  res.send('API for Technical Challenge is running! Docs available at /api-docs');
});

// ... (o resto das suas rotas)
app.use('/auth', authRoutes);
app.use('/datasets', datasetRoutes);
app.use('/records', recordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});