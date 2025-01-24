import { UserModel } from '../../models/users.model.js';
import { FarmModel, farmRegistrationSchema } from '../../models/farms.model.js';

const createFarm = async (req, res) => {
  try {
    const validatedData = farmRegistrationSchema.parse(req.body);

    const farmer = await UserModel.findOne({ userNationalId: validatedData.farmerNationalId, role: 'farmer' });

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found with the provided National ID.' });
    }

    const newFarm = new FarmModel({
      farmer: farmer._id,
      county: validatedData.county,
      subCounty: validatedData.subCounty,
      ward: validatedData.ward,
      size: validatedData.size,
      status: validatedData.status,
      geoLocation: validatedData.geoLocation,
    });

    await newFarm.save();
    return res.status(201).json(newFarm);
  } catch (error) {
    console.error('Error creating farm:', error);
    return res.status(400).json({ message: error.message });
  }
};

const getAllFarms = async (req, res) => {
  try {
    const farms = await FarmModel.find().populate('farmer', 'userNationalId userName');
    return res.status(200).json(farms);
  } catch (error) {
    console.error('Error fetching farms:', error);
    return res.status(500).json({ message: 'Error fetching farms' });
  }
};

const getFarmById = async (req, res) => {
  try {
    const farm = await FarmModel.findById(req.params.id).populate('farmer', 'userNationalId userName');

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    return res.status(200).json(farm);
  } catch (error) {
    console.error('Error fetching farm:', error);
    return res.status(500).json({ message: 'Error fetching farm' });
  }
};

const updateFarm = async (req, res) => {
  try {
    const farmId = req.params.id;
    const updatedData = req.body;

    const validatedData = farmRegistrationSchema.parse(updatedData);

    const farm = await FarmModel.findById(farmId);

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    farm.county = validatedData.county || farm.county;
    farm.subCounty = validatedData.subCounty || farm.subCounty;
    farm.ward = validatedData.ward || farm.ward;
    farm.size = validatedData.size || farm.size;
    farm.status = validatedData.status || farm.status;
    farm.geoLocation = validatedData.geoLocation || farm.geoLocation;

    await farm.save();
    return res.status(200).json(farm);
  } catch (error) {
    console.error('Error updating farm:', error);
    return res.status(400).json({ message: error.message });
  }
};

const deleteFarm = async (req, res) => {
  try {
    const farmId = req.params.id;

    const farm = await FarmModel.findByIdAndDelete(farmId);

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    return res.status(200).json({ message: 'Farm deleted successfully' });
  } catch (error) {
    console.error('Error deleting farm:', error);
    return res.status(500).json({ message: 'Error deleting farm' });
  }
};

export { createFarm, getAllFarms, getFarmById, updateFarm, deleteFarm };
