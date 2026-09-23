const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeTasks = async (tasks) => {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
};

const getAllTasks = async () => {
  return await readTasks();
};

const getTaskById = async (id) => {
  const tasks = await readTasks();
  const task = tasks.find((task) => task.id === id);

  return task || null;
};

const createTask = async (taskData) => {
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

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
