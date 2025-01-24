import express from 'express';
import { createDevice, getAllDevices, getDeviceById, updateDevice, deleteDevice } from './devices.controller.js';

const deviceRouter = express.Router();
deviceRouter.post('/', createDevice);
deviceRouter.get('/', getAllDevices);
deviceRouter.get('/:id', getDeviceById);
deviceRouter.put('/:id', updateDevice);
deviceRouter.delete('/:id', deleteDevice);

export default deviceRouter;
