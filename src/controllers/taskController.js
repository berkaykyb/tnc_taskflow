const taskService = require("../services/taskService");

const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, assigneeId, sort, order, page, limit } =
      req.query;
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 10));

    const result = await taskService.getAllTasks({
      status,
      priority,
      assigneeId: assigneeId ? Number(assigneeId) : undefined,
      sort,
      order,
      page: pageNumber,
      limit: limitNumber,
    });
    res.status(200).json(result);
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
    const { title, description, status, priority, assigneeId, dueDate } =
      req.body;
    const newTask = await taskService.createTask({
      title,
      description,
      status,
      priority,
      assigneeId,
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
    const { title, description, status, priority, assigneeId, dueDate } =
      req.body;

    const taskData = {
      title,
      description,
      status,
      priority,
      assigneeId,
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

const deleteTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found!",
      });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
