import '@babel/polyfill';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import i18n from './controllers/i18n';
import router from './routers/index';
import successRes from './helpers/successHandler';
import docRouter from './documentation/index';

config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(express.static('public'));
app.use(i18n.init);
app.use('/api/documentation', docRouter);
app.use('/api', router);

app.get('/', (req, res) => {
  successRes(res, 200, res.__('Welcome to Phantom'));
});



const port = process.env.PORT;
app.listen(port, console.log(`Server started on port ${port}`));

export default app;
