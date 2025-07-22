import { Router } from 'express';
import authController from './auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 * name: Auth
 * description: Autenticação de usuários e gerenciamento de tokens
 */

/**
 * @swagger
 * /auth/register:
 * post:
 * summary: Registra um novo usuário
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - email
 * - password
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * format: password
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * 409:
 * description: Email já em uso
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Autentica um usuário e retorna um token JWT
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * format: password
 * responses:
 * 200:
 * description: Login bem-sucedido, retorna token
 * 401:
 * description: Credenciais inválidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/me:
 * get:
 * summary: Retorna as informações do usuário autenticado
 * tags: [Auth]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Informações do usuário
 * 401:
 * description: Token não fornecido
 * 403:
 * description: Token inválido ou expirado
 */
router.get('/me', authenticateToken, authController.me);

export default router;