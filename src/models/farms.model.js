import mongoose from 'mongoose';
import { z } from 'zod';

const FarmSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Farmer is required'],
    },
    county: {
      type: String,
      required: [true, 'County is required'],
    },
    subCounty: {
      type: String,
      required: [true, 'Sub-County is required'],
    },
    ward: {
      type: String,
      required: [true, 'Ward is required'],
    },
    size: {
      type: Number,
      required: [true, 'Farm size is required'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    geoLocation: {
      type: { type: String, default: 'Point' },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true },
);

FarmSchema.index({ geoLocation: '2dsphere' });

const FarmModel = mongoose.model('Farm', FarmSchema);

// Zod schema for Farm registration validation
const farmRegistrationSchema = z.object({
  farmerNationalId: z.string().regex(/^\d+$/, 'National ID must be numeric.'),
  county: z.string().min(1, 'County is required.'),
  subCounty: z.string().min(1, 'Sub-County is required.'),
  ward: z.string().min(1, 'Ward is required.'),
  size: z.number().min(1, 'Farm size must be greater than 0.'),
  status: z.enum(['Active', 'Inactive']),
  geoLocation: z.object({
    type: z.literal('Point'),
    coordinates: z.array(z.number()).length(2, 'Coordinates must have latitude and longitude values'),
  }),
});

// Export modules
export { FarmModel, farmRegistrationSchema };
