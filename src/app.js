const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");

const app = express();

app.use(logger);
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "TaskFlow API",
    endpoints: { tasks: "/tasks", users: "/users" },
  });
});
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found!" });
});
app.use(errorHandler);

module.exports = app;
