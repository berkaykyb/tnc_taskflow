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

module.exports = { getAllTasks };
