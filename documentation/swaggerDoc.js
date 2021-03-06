const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const docrouter = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phantom Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',

      contact: {
        name: 'Phantom',
        url: '',
        email: 'atlpincredible@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      },
      {
        url: 'https://incredible-p-ft-enquire-pc3col.herokuapp.com'
      }
    ]
  },
  apis: ['../src/routers/*.js']
};

const specs = swaggerJsdoc(options);
docrouter.use('/', swaggerUi.serve, swaggerUi.setup(specs));
export default docrouter;
