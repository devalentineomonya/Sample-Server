import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../models/users.model';

const registerUser = async (req, res) => {
  try {
    const validatedData = req.body;

    const existingUser = await UserModel.findOne({ userEmail: validatedData.userEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(validatedData.userPassword, 10);

    const newUser = new UserModel({
      ...validatedData,
      userPassword: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }

    res.status(500).json({ message: 'An error occurred while registering the user', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userNationalId, password } = req.body;

    const user = await UserModel.findOne({ userNationalId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const accessToken = jwt.sign(
      { userId: user._id, userNationalId: user.userNationalId },
      '4d3363d8443f756346a8eb25d6315498b256a3160cc981c80bdc34e5b00d1f0e149c616dda029a4928125ed48284e1eab115f3fe94641ecf7ac41d545625a743',
      { expiresIn: '1d' },
    );

    res.status(201).json({
      message: 'Login successful',
      access_token: accessToken,
      payload: {
        userNationalId: user.userNationalId,
        username: user.userName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in', error: error.message });
  }
};

export { registerUser, loginUser };
