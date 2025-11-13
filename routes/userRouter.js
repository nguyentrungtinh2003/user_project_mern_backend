const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", authMiddleware(), userController.getAllUser);
router.get("/page", authMiddleware(), userController.getUserByPage);
router.get("/search", authMiddleware(), userController.searchUser);
router.get("/:id", authMiddleware(), userController.getUserById);
router.put("/update/:id", authMiddleware(), userController.updateUser);
router.delete("/delete/:id", authMiddleware(), userController.deleteUser);

//Upload image
router.patch(
  "/:id/avatar",
  authMiddleware(),
  userController.uploadUserImage,
  userController.uploadImageUser
);

module.exports = router;
