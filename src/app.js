const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");

const app = express();

app.use(logger);
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use(errorHandler);

module.exports = app;
