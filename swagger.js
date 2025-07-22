const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API - Desafio Técnico Backend',
    description: 'API para ingestão e gerenciamento de documentos, autenticação e buscas.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format **Bearer &lt;token&gt;**'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.ts'];

// Gera o arquivo swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);