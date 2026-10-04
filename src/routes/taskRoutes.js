const express = require("express");
const taskController = require("../controllers/taskController");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../middlewares/validateTask");
const normalizeTask = require("../middlewares/normalizeTask");

const router = express.Router();

router.get("/", taskController.getAllTasks);
router.get("/search", taskController.searchTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", normalizeTask, validateCreateTask, taskController.createTask);
router.patch(
  "/:id",
  normalizeTask,
  validateUpdateTask,
  taskController.updateTask,
);
router.put(
  "/:id",
  normalizeTask,
  validateUpdateTask,
  taskController.updateTask,
);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
