const TEXT_FIELDS = ["name", "email"];

const normalizeUser = (req, res, next) => {
  TEXT_FIELDS.forEach((field) => {
    const value = req.body[field];

    if (typeof value === "string") {
      const cleaned = value.trim().replace(/\s+/g, " ");
      req.body[field] = cleaned === "" ? null : cleaned;
    }
  });

  if (typeof req.body.email === "string") {
    req.body.email = req.body.email.toLowerCase();
  }

  next();
};

module.exports = normalizeUser;
