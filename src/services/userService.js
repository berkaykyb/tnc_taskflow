const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

const readUsers = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const getAllUsers = async () => {
  return await readUsers();
};

const getUserById = async (id) => {
  const users = await readUsers();
  const user = users.find((user) => user.id === id);

  return user || null;
};

module.exports = { getAllUsers, getUserById };
