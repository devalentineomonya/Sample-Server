import { z } from 'zod';

import { Device, deviceRegistrationSchema } from '../../models/devices.model.js';

export const createDevice = async (req, res) => {
  try {
    // Validate the request body with Zod schema
    const validatedData = deviceRegistrationSchema.parse(req.body);

    // Create a new Device
    const newDevice = new Device({
      deviceId: validatedData.deviceId,
      status: validatedData.status,
      calibrationDate: new Date(validatedData.calibrationDate),
    });

    // Save to the database
    await newDevice.save();

    // Return success response
    res.status(201).json({
      message: 'Device created successfully',
      data: newDevice,
    });
  } catch (error) {
    // Handle errors, either validation or server errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json({
      message: 'Devices retrieved successfully',
      data: devices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve devices',
    });
  }
};

export const getDeviceById = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({
      message: 'Device retrieved successfully',
      data: device,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve the device',
    });
  }
};

export const updateDevice = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Validate the request body with Zod schema
    const validatedData = deviceRegistrationSchema.parse(updatedData);

    // Update the device by ID
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      {
        deviceId: validatedData.deviceId,
        status: validatedData.status,
        calibrationDate: new Date(validatedData.calibrationDate),
      },
      { new: true }, // Return the updated document
    );

    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({
      message: 'Device updated successfully',
      data: updatedDevice,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
    console.error(error);
    res.status(500).json({
      message: 'Failed to update device',
    });
  }
};

export const deleteDevice = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDevice = await Device.findByIdAndDelete(id);
    if (!deletedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({
      message: 'Device deleted successfully',
      data: deletedDevice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete device',
    });
  }
};
