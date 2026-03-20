const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require("../controllers/userController");

const router = express.Router();

router.post("/create", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

module.exports = router;
