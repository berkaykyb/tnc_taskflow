const VALID_SORT_FIELDS = ["createdAt", "dueDate"];

const fs = require("fs").promises;
const path = require("path");
const userService = require("./userService");

const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeTasks = async (tasks) => {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
};

const ensureUserExists = async (assigneeId) => {
  if (assigneeId === undefined || assigneeId === null) {
    return;
  }
  const user = await userService.getUserById(assigneeId);

  if (!user) {
    const error = new Error("assigneeId does not match any user");
    error.statusCode = 400;
    throw error;
  }
};

const getAllTasks = async (filters = {}) => {
  const tasks = await readTasks();
  const { status, priority, assigneeId, sort, order, page, limit } = filters;

  let result = tasks;

  if (status) {
    result = result.filter((task) => task.status === status);
  }

  if (priority) {
    result = result.filter((task) => task.priority === priority);
  }

  if (assigneeId) {
    result = result.filter((task) => task.assigneeId === assigneeId);
  }

  if (sort && VALID_SORT_FIELDS.includes(sort)) {
    const direction = order === "desc" ? -1 : 1;

    result = [...result].sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      return aValue.localeCompare(bValue) * direction;
    });
  }

  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;

  const data = result.slice(startIndex, startIndex + limit);

  return {
    data,
    pagination: { page, limit, total, totalPages },
  };
};

const getTaskById = async (id) => {
  const tasks = await readTasks();
  const task = tasks.find((task) => task.id === id);

  return task || null;
};

const createTask = async (taskData) => {
  await ensureUserExists(taskData.assigneeId);
  const tasks = await readTasks();

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    ...taskData,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  return newTask;
};

const updateTask = async (id, taskData) => {
  await ensureUserExists(taskData.assigneeId);
  const tasks = await readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return null;
  }
  const updatedTask = {
    ...tasks[index],
    ...taskData,
    id: tasks[index].id,
  };

  tasks[index] = updatedTask;
  await writeTasks(tasks);

  return updatedTask;
};

const deleteTask = async (id) => {
  const tasks = await readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return null;
  }
  const deletedTask = tasks[index];
  tasks.splice(index, 1);
  await writeTasks(tasks);
  return deletedTask;
};

const unassignTasksByUserId = async (userId) => {
  const tasks = await readTasks();
  let updatedCount = 0;

  tasks.forEach((task) => {
    if (task.assigneeId === userId) {
      task.assigneeId = null;
      updatedCount += 1;
    }
  });

  if (updatedCount > 0) {
    await writeTasks(tasks);
  }

  return updatedCount;
};

const searchTasks = async (keyword) => {
  const tasks = await readTasks();
  keyword = keyword.toLowerCase();

  return tasks.filter((task) => {
    const inTitle = task.title.toLowerCase().includes(keyword);
    const inDescription = task.description
      ? task.description.toLowerCase().includes(keyword)
      : false;
    return inTitle || inDescription;
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  unassignTasksByUserId,
  searchTasks,
};
