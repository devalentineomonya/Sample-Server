import { Subscription, subscriptionSchema } from '../../models/subscriptions.model.js';

export const createSubscription = async (req, res) => {
  try {
    const validatedData = subscriptionSchema.parse(req.body);

    const newSubscription = new Subscription(validatedData);

    await newSubscription.save();

    res.status(201).json({
      message: 'Subscription created successfully',
      data: newSubscription,
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
      message: 'Internal server error',
    });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      message: 'Subscriptions fetched successfully',
      data: subscriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({
        message: 'Subscription not found',
      });
    }

    res.status(200).json({
      message: 'Subscription fetched successfully',
      data: subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const updateSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const validatedData = subscriptionSchema.parse(req.body);

    const updatedSubscription = await Subscription.findByIdAndUpdate(id, validatedData, { new: true });

    if (!updatedSubscription) {
      return res.status(404).json({
        message: 'Subscription not found',
      });
    }

    res.status(200).json({
      message: 'Subscription updated successfully',
      data: updatedSubscription,
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
      message: 'Internal server error',
    });
  }
};

export const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(id);

    if (!deletedSubscription) {
      return res.status(404).json({
        message: 'Subscription not found',
      });
    }

    res.status(200).json({
      message: 'Subscription deleted successfully',
      data: deletedSubscription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
