const VALID_STATUSES = ["todo", "in-progress", "done"];
const VALID_PRIORITIES = ["low", "medium", "high"];

const validateCreateTask = (req, res, next) => {
  const { title, description, status, priority, assignee, dueDate } = req.body;
  const errors = [];

  if (typeof title !== "string") {
    errors.push("title is required and must be a non-empty string");
  }

  if (!VALID_STATUSES.includes(status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(", ")}`);
  }

  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      errors.push("description must be a string");
    }
  }

  if (assignee !== undefined && assignee !== null) {
    if (typeof assignee !== "string") {
      errors.push("assignee must be a string");
    }
  }

  if (dueDate !== undefined && dueDate !== null) {
    if (isNaN(new Date(dueDate).getTime())) {
      errors.push("dueDate must be a valid date");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
  next();
};

const validateUpdateTask = (req, res, next) => {
  const { title, description, status, priority, assignee, dueDate } = req.body;
  const errors = [];

  if (title !== undefined) {
    if (typeof title !== "string") {
      errors.push("title must be a non-empty string");
    }
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(", ")}`);
  }

  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      errors.push("description must be a string");
    }
  }

  if (assignee !== undefined && assignee !== null) {
    if (typeof assignee !== "string") {
      errors.push("assignee must be a non-empty string");
    }
  }

  if (dueDate !== undefined && dueDate !== null) {
    if (isNaN(new Date(dueDate).getTime())) {
      errors.push("dueDate must be a valid date");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = { validateCreateTask, validateUpdateTask };
