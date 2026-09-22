const taskService = require("../services/taskService");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found!",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, assignee, dueDate } =
      req.body;
    const newTask = await taskService.createTask({
      title,
      description,
      status,
      priority,
      assignee,
      dueDate,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, description, status, priority, assignee, dueDate } =
      req.body;

    const taskData = {
      title,
      description,
      status,
      priority,
      assignee,
      dueDate,
    };

    Object.keys(taskData).forEach(
      (key) => taskData[key] === undefined && delete taskData[key],
    );

    const updatedTask = await taskService.updateTask(id, taskData);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found!",
      });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask };
