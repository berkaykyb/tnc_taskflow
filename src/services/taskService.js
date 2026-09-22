const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const getAllTasks = async () => {
  return await readTasks();
};

const getTaskById = async (id) => {
  const tasks = await readTasks();
  const task = tasks.find((task) => task.id === id);

  return task || null;
};

module.exports = { getAllTasks, getTaskById };
