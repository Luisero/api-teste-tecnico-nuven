import express from 'express';
import authRoutes from './modules/auth/auth.routes'; // <-- 1. IMPORTAR

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API for Technical Challenge is running!');
});

// 2. USAR AS ROTAS DE AUTENTICAÇÃO COM O PREFIXO /auth
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});