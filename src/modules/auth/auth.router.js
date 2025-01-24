import express from 'express';
import { validateRequestBody } from 'zod-express-middleware';
import { registerUser, loginUser } from './auth.controller.js';
import { userRegistrationSchema, userLoginSchema } from '../../models/users.model.js';

const router = express.Router();

router.post('/signup', validateRequestBody(userRegistrationSchema), registerUser);

router.post('/signin', validateRequestBody(userLoginSchema), loginUser);

export default router;
