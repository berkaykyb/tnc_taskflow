const express = require("express");
const userController = require("../controllers/userController");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../middlewares/validateUser");
const normalizeUser = require("../middlewares/normalizeUser");

const router = express.Router();
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post(
  "/",
  normalizeUser,
  validateCreateUser,
  validateUpdateUser,
  userController.createUser,
);
router.patch(
  "/:id",
  normalizeUser,
  validateUpdateUser,
  userController.updateUser,
);
router.put(
  "/:id",
  normalizeUser,
  validateUpdateUser,
  userController.updateUser,
);
router.delete("/:id", userController.deleteUser);

module.exports = router;
