import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import swagger from 'swagger-ui-express';
import swaggerDoc from '../documentation/swaggerDoc.json';
import router from './routers/index';
import nodemailer from 'nodemailer';


config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(express.static('public'));

app.use('/api/documentation', swagger.serve, swagger.setup(swaggerDoc));

app.use('/api', router);

const port = process.env.PORT;
app.listen(port, console.log(`Server started on port ${port}`));

export default app;
