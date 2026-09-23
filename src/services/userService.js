const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

const readUsers = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeUsers = async (users) => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

const getAllUsers = async () => {
  return await readUsers();
};

const getUserById = async (id) => {
  const users = await readUsers();
  const user = users.find((user) => user.id === id);

  return user || null;
};

const createUser = async (userData) => {
  const users = await readUsers();

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    ...userData,
    role: "member",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
};

module.exports = { getAllUsers, getUserById, createUser };
