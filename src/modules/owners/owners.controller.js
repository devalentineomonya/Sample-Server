import { UserModel } from '../../models/users.model.js';

export const getOwners = async (req, res) => {
  try {
    const farmers = await UserModel.find({ role: 'owner' }, { userPassword: 0 });
    if (!farmers || farmers.length === 0) {
      return res.status(404).json({ message: 'No farmers found' });
    }

    return res.status(200).json(farmers);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
