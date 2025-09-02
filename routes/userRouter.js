const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", authMiddleware, userController.getAllUser);
router.get("/page", authMiddleware, userController.getUserByPage);
router.get("/:id", authMiddleware, userController.getUserById);
router.get("/update/:id", authMiddleware, userController.updateUser);
router.get("/delete/:id", authMiddleware, userController.deleteUser);

module.exports = router;
