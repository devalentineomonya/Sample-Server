import express from 'express';
import { createFarm, getAllFarms, getFarmById, updateFarm, deleteFarm } from './farms.controller.js';

const farmRouter = express.Router();

farmRouter.post('/', createFarm);
farmRouter.get('/', getAllFarms);
farmRouter.get('/:id', getFarmById);
farmRouter.put('/:id', updateFarm);
farmRouter.delete('/:id', deleteFarm);

export default farmRouter;
