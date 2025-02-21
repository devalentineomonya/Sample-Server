import express from 'express';
import { getUsers } from './users.controller.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);

export default userRouter;
