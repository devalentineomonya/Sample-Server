import express from 'express';

import { getOwners } from './owners.controller.js';

const ownerRouter = express.Router();

ownerRouter.get('/', getOwners);

export default ownerRouter;
