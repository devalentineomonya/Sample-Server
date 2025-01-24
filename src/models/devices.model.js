import { z } from 'zod';
import mongoose from 'mongoose';

 const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      maxlength: 50,
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
    },
    calibrationStatus: {
      type: String,
      default: 'Not Calibrated',
    },
    calibrationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const deviceRegistrationSchema = z.object({
  deviceId: z.string().min(1, 'Device ID is required').max(50, 'Device ID must be less than 50 characters'),
  status: z.enum(['Active', 'Inactive'], { errorMap: () => ({ message: 'Please select a valid status' }) }),
  calibrationDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Calibration date must be a valid date',
  }),
});

export const Device = mongoose.model('Device', deviceSchema);
