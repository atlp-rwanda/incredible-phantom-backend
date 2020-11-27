import swaggerJsDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { Router } from 'express';

const docRouter = Router();

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

export default docRouter;
