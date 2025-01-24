import mongoose from 'mongoose';
import { z } from 'zod';

const subscriptionSchema = z.object({
  deviceId: z.string().min(1, { message: 'Device ID is required' }),
  packageType: z.enum(['unlimited', 'pamojaPackage', 'inuaPackage'], {
    message: 'Invalid package type',
  }),
  payment: z.number().min(1, { message: 'Payment amount is required' }),
  monthlyPayment: z.number().min(0, { message: 'Monthly payment must be at least 0' }),
  ownerNationalId: z.string().min(1, { message: "Owner's National ID is required" }),
  transactionId: z.string().min(1, { message: 'Transaction ID is required' }),
  plan: z.number().optional(),
});

const subscriptionModel = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    packageType: {
      type: String,
      enum: ['unlimited', 'pamojaPackage', 'inuaPackage'],
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
    monthlyPayment: {
      type: Number,
      required: true,
    },
    ownerNationalId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    plan: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

const Subscription = mongoose.model('Subscription', subscriptionModel);

export { subscriptionSchema, Subscription };
