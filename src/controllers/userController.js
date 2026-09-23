const userService = require("../services/userService");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById };
