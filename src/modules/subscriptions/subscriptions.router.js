import express from 'express';

import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from './subscriptions.controller';

const subscriptionRouter = express.Router();

subscriptionRouter.post('/', createSubscription);
subscriptionRouter.get('/', getAllSubscriptions);
subscriptionRouter.get('/:id', getSubscriptionById);
subscriptionRouter.put('/:id', updateSubscription);
subscriptionRouter.delete('/:id', deleteSubscription);

export default subscriptionRouter;
