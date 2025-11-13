const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    // const user = await authService.register(req.body);
    await authService.register(req.body);
    res.status(201).json({ message: "Register success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.status(200).json({ message: "Login success", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
