// Import necessary modules
import mongoose from 'mongoose';
import { z } from 'zod';

// Mongoose schema
const UserSchema = new mongoose.Schema(
  {
    userNationalId: {
      type: String,
      unique: true,
      required: [true, 'ID number is required'],
      match: [/^\d+$/, 'ID number must be numeric'],
    },
    userName: {
      type: String,
      unique: true,
      required: [true, 'Full name is required'],
    },
    userPhoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be numeric and 10 digits long'],
    },
    userEmail: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Email is invalid'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['admin', 'agent', 'farmer'],
    },
    userCounty: {
      type: String,
      required: [true, 'County is required'],
    },
    userSubCounty: {
      type: String,
      required: [true, 'Sub-County is required'],
    },
    userWard: {
      type: String,
      required: [true, 'Ward is required'],
    },
    userPassword: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', UserSchema);

const userRegistrationSchema = z.object({
  userNationalId: z.string().regex(/^\d+$/, 'National ID must be numeric.'),
  userName: z.string().min(1, 'Name is required.'),
  userPhoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits long.'),
  userEmail: z.string().email('Invalid email address.'),
  role: z.enum(['admin', 'agent', 'farmer'], 'Invalid role.'),
  userCounty: z.string().min(1, 'County is required.'),
  userSubCounty: z.string().min(1, 'Sub-County is required.'),
  userWard: z.string().min(1, 'Ward is required.'),
  userPassword: z.string().min(6, 'Password must be at least 6 characters long.'),
});

// Zod schema for user login
const userLoginSchema = z.object({
  userNationalId: z.string().regex(/^\d+$/, 'National ID must be numeric.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

// Export modules
export { UserModel, userLoginSchema, userRegistrationSchema };
