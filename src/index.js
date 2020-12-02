import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import swaggerDoc from '../documentation/swaggerDoc.json';
import { config } from 'dotenv';
import router from './routers/index';
import routes from './routers/routes';
import bodyParser from 'body-parser';
import busStop from './routers/busStops';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
const swaggerDefinition = {
    definition: {
      info: {
        title: 'Phantom',
        version: '1.0.0',
        description:
              'Phantom is a web application that tracks the movement of transport buses on any device. ',
      },
      servers: [{
        url: 'http://localhost:3000',
      },
      ],
    },
    apis: ['./src/routers/*.js'],
  };

config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.use('/api/documentation', swagger.serve, swagger.setup(swaggerDoc));

app.use('/api', router);
app.use('/route' , routes);

const port = process.env.PORT;
app.listen(port, console.log(`Server started on port ${port}`));

export default app;
