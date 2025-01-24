import { UserModel } from "../../models/users.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, { userPassword: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
