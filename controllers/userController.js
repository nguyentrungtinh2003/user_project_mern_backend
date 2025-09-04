const userService = require("../services/userService");

const getAllUser = async (req, res) => {
  try {
    const allUser = await userService.getAllUser();
    res.status(200).json({ message: "Get all user success", allUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserByPage = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userPage = await userService.getUserByPage(page, limit);
    res.status(200).json({ message: "Get user page success", userPage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const userPage = await userService.searchUsers(query, page, limit);
    res.status(200).json({ message: "Search user page success", userPage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ message: "Get user id success", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const userUpdate = await userService.updateUser(id, user);
    res.status(200).json({ message: "Update user id success", userUpdate });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDelete = await userService.deleteUser(id);
    res.status(200).json({ message: "Delete user id success", userDelete });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUser,
  getUserByPage,
  getUserById,
  searchUser,
  updateUser,
  deleteUser,
};
