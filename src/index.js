import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';

config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(json());

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to phantom',
  });
});

const port = process.env.PORT;
app.listen(3000, console.log(`Server started on port ${port}`));