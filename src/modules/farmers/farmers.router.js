import express from 'express';
import { getFarmers } from './farmers.controller.js';

const farmerRouter = express.Router();

farmerRouter.get('/', getFarmers);

export default farmerRouter;
