import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import swaggerDoc from '../documentation/swaggerDoc';
import { config } from 'dotenv';
import router from './routers/index';

import Docrouter from '../documentation/swaggerDoc';
const socket = require("socket.io");

config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(json());

app.use(express.static('public'));

app.use('/api/documentation', Docrouter);


app.use('/api', router);

const port = process.env.PORT;
const server=app.listen(port, console.log(`Server started on port ${port}`));
const io=socket(server)
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on("disconnect", () => {
      console.log("user disconnected");
    });
});
export default app;

