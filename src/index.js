import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import swaggerDoc from '../documentation/swaggerDoc.json';
import { config } from 'dotenv';
import router from './routers/index';
import bodyParser from 'body-parser';

config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.use('/api/documentation', swagger.serve, swagger.setup(swaggerDoc));

app.use('/api', router);

const port = process.env.PORT;
app.listen(3000, console.log(`Server started on port ${port}`));

export default app;


