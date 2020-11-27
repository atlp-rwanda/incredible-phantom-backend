const swaggerJsDoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
const express = require('express');

const docRouter = express.Router();

const spec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phantom The BUS Tracking App',
      version: '1.0.0',
      description:
        'This app helps passengers track their buses in all directions in Kigali city',

      contact: {
        name: 'Phantom',
        url: 'https://phantom-atlp.netlify.app',
        email: 'atlpincredible@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://incredible-phantomapp-heroku.herokuapp.com',
      },
    ],
  },
  apis: ['./src/routers/*.js'],
};

const swaggerDocument = swaggerJsDoc(spec);

docRouter.use(
  '/',
  swaggerui.serve,
  swaggerui.setup(swaggerDocument, { explorer: true }),
);

module.exports = docRouter;
