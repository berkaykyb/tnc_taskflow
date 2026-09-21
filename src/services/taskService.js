const tasks = [
  { id: 1, title: "Login ekranı tasarımı", status: "todo" },
  { id: 2, title: "API testlerini yaz", status: "done" },
];

const getAllTasks = () => {
  return tasks;
};

module.exports = { getAllTasks };
