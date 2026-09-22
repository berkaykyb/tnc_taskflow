const taskService = require("../services/taskService");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks };
