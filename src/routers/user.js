const express = require("express");
const {
  register,
  login,
  logout,
  getAllUsers,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/", auth, getAllUsers);

module.exports = router;
