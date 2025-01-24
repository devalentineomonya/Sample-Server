import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

import { connectDB } from './src/utils/db.js';
import authRouter from './src/modules/auth/auth.router';
import userRouter from './src/modules/users/users.router';
import farmerRouter from './src/modules/farmers/farmers.router';
import farmRouter from './src/modules/farms/farms.router';
import subscriptionRouter from './src/modules/subscriptions/subscriptions.router';
import deviceRouter from './src/modules/devices/devices.router';
import ownerRouter from './src/modules/owners/owners.router';

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({ Hello: 'world' });
});
app.use('/auth', authRouter);
app.use('/farms', farmRouter);
app.use('/users', userRouter);
app.use('/owners', ownerRouter);
app.use('/devices', deviceRouter);
app.use('/farmers', farmerRouter);
app.use('/subscriptions', subscriptionRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(9080, () => {
      console.log('Server running on port 9080');
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

startServer();
