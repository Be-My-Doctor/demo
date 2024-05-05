import express from 'express';
import cors from 'cors';

import config from './config.js';
import userRoute from './Routes/userRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api', userRoute);

app.listen(`${process.env.VERCEL_URL || config.port}`, () =>
// app.listen(`${config.port}`, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);