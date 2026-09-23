const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];

  if (typeof name !== "string") {
    errors.push("name is required and must be a non-empty string");
  }

  if (typeof email !== "string") {
    errors.push("email is required and must be a non-empty string");
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push("email must be a valid email address");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];

  if (name !== undefined && typeof name !== "string") {
    errors.push("name must be a non-empty string");
  }

  if (email !== undefined) {
    if (typeof email !== "string") {
      errors.push("email must be a non-empty string");
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.push("email must be a valid email address");
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

module.exports = { validateCreateUser, validateUpdateUser };
