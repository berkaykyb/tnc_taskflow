const taskService = require("../services/taskService");

const getAllTasks = async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.status(200).json(tasks);
};

module.exports = { getAllTasks };
