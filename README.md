# API - Desafio Técnico Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-blue?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-green?style=for-the-badge&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-purple?style=for-the-badge&logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker)

## 📄 Descrição do Projeto

Esta é uma API RESTful desenvolvida como parte de um desafio técnico para a vaga de Desenvolvedor Backend. [cite_start]O projeto simula o backend de uma plataforma centralizada, com foco nas seguintes funcionalidades[cite: 5]:
-   [cite_start]**Ingestão e gerenciamento de documentos** (.csv e .pdf)[cite: 6].
-   [cite_start]**Autenticação de usuários** via JWT[cite: 7].
-   [cite_start]**Registro de buscas** simuladas através de uma IA Mock[cite: 8].
-   [cite_start]**Persistência de dados** em um banco de dados relacional (PostgreSQL)[cite: 9].

## ✨ Funcionalidades Principais

-   [cite_start][x] **Autenticação e Controle de Acesso**: Sistema completo de registro (`/auth/register`) e login (`/auth/login`) com tokens JWT[cite: 13, 25].
-   [x] **Middleware de Proteção**: Rotas críticas são protegidas e só podem ser acessadas por usuários autenticados.
-   [cite_start][x] **Perfil do Usuário**: Endpoint `GET /me` que retorna os dados do usuário logado[cite: 19, 26].
-   [cite_start][x] **Upload de Arquivos**: Endpoint `POST /datasets/upload` para ingestão de arquivos `.csv` e `.pdf` [cite: 29] utilizando `multer`.
-   [x] **Processamento de Dados**: Leitura e parsing de arquivos `.csv` para popular o banco de dados com registros individuais.
-   [cite_start][x] **Gerenciamento de Datasets**: Listagem (`GET /datasets`) dos datasets pertencentes ao usuário[cite: 32].
-   [cite_start][x] **Gerenciamento de Records**: Listagem (`GET /datasets/:id/records`) dos registros de um dataset específico[cite: 33].
-   [cite_start][x] **Busca Textual**: Endpoint `GET /records/search` para realizar buscas por palavra-chave no conteúdo dos registros[cite: 34].
-   [cite_start][x] **Simulação de IA**: Endpoint `POST /queries` que simula uma consulta a uma IA e registra a pergunta e a resposta[cite: 36, 37].
-   [cite_start][x] **Histórico de Consultas**: Endpoint `GET /queries` para visualizar o histórico de perguntas feitas pelo usuário[cite: 48].
-   [cite_start][x] **Documentação Interativa**: API 100% documentada com Swagger UI[cite: 16], facilitando os testes e o entendimento dos endpoints.

## 🛠️ Tecnologias Utilizadas

[cite_start]Este projeto foi construído utilizando as seguintes tecnologias obrigatórias[cite: 10]:

-   [cite_start]**Backend**: Node.js com Express [cite: 11]
-   [cite_start]**Banco de Dados**: PostgreSQL com Prisma ORM [cite: 12]
-   [cite_start]**Autenticação**: JSON Web Tokens (JWT) [cite: 13]
-   [cite_start]**Upload de Arquivos**: Multer [cite: 14]
-   [cite_start]**Containerização**: Docker e Docker Compose [cite: 15]
-   [cite_start]**Documentação**: Swagger UI (via `swagger-autogen` e `swagger-ui-express`) [cite: 16]

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente local.

### Pré-requisitos
-   [Docker](https://www.docker.com/get-started)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.example` (se houver) ou crie um novo arquivo chamado `.env` na raiz do projeto e preencha com as seguintes variáveis:
    ```env
    # Configuração do Banco de Dados
    DB_USER=docker_user
    DB_PASSWORD=strong_password
    DB_NAME=desafio_db
    DATABASE_URL="postgresql://docker_user:strong_password@postgres_challenge:5432/desafio_db"

    # Segredo para os tokens JWT
    JWT_SECRET="seu-segredo-super-secreto-para-o-jwt"
    ```

3.  **Gere a documentação Swagger:**
    Este projeto usa `swagger-autogen` para criar a documentação a partir do código. Execute este comando **uma vez** para gerar o arquivo `swagger-output.json`:
    ```bash
    # (Opcional, se o Docker já estiver rodando)
    # docker compose exec api_challenge npm run swagger-gen

    # Alternativamente, você pode instalar as dependências localmente e rodar:
    npm install
    npm run swagger-gen
    ```

4.  **Construa a Imagem e Inicie os Contêineres:**
    Este comando irá construir a imagem da API e iniciar os contêineres do banco de dados e da aplicação.
    ```bash
    docker compose up --build
    ```
    O terminal ficará mostrando os logs da aplicação.

5.  **Execute a Migração do Banco de Dados:**
    Com os contêineres rodando, abra **outro terminal** e execute o seguinte comando para criar as tabelas no banco de dados:
    ```bash
    docker compose exec api_challenge npx prisma migrate dev
    ```

Pronto! A aplicação estará rodando.

## 📚 Documentação da API (Swagger)

A documentação completa e interativa da API está disponível e pode ser acessada no seu navegador através do seguinte link:

[**http://localhost:3000/api-docs**](http://localhost:3000/api-docs)

Lá, você pode visualizar todos os endpoints, seus parâmetros, corpos de requisição, respostas e até mesmo testá-los diretamente. Para as rotas protegidas, você pode usar o botão "Authorize" para adicionar seu token JWT.

## 🗺️ Endpoints Principais

| Método | Rota                     | Descrição                                 | Protegida? |
| :----- | :----------------------- | :---------------------------------------- | :--------: |
| `POST` | `/auth/register`         | Registra um novo usuário.                 |     Não    |
| `POST` | `/auth/login`            | Autentica um usuário e retorna um token.  |     Não    |
| `GET`  | `/auth/me`               | Retorna dados do usuário logado.          |     Sim    |
| `POST` | `/datasets/upload`       | Faz upload de um arquivo (`.csv`/`.pdf`). |     Sim    |
| `GET`  | `/datasets`              | Lista os datasets do usuário.             |     Sim    |
| `GET`  | `/datasets/:id/records`  | Lista os registros de um dataset.         |     Sim    |
| `GET`  | `/records/search`        | Busca registros por palavra-chave.        |     Sim    |
| `POST` | `/queries`               | Submete uma pergunta para a IA Mock.      |     Sim    |
| `GET`  | `/queries`               | Lista o histórico de perguntas.           |     Sim    |

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.