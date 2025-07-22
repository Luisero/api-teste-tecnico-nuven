import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import datasetRoutes from './modules/datasets/datasets.routes';
import recordRoutes from './modules/records/records.routes';

// --- Imports para o Swagger ---
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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