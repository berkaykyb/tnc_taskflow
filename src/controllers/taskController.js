const taskService = require("../services/taskService");

const getAllTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.status(200).json(tasks);
};

module.exports = { getAllTasks };
