import { login, register } from "../services/auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const data = req.body;
    await register(data);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await login(data);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
