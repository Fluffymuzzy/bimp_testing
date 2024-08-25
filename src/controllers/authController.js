import { registerUser, loginUser } from "../services/authService.js";

export const registerController = async (req, res) => {
  try {
    const { status, message, user } = await registerUser(req.body);
    res.status(status).json({ message, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req, res) => { 
  try {
    const { status, message, user } = await loginUser(req.body);
    res.status(status).json({ message, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};