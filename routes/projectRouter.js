const projectController = require("../controllers/projectController");
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", authMiddleware, projectController.getAllProject);
router.get("/page", authMiddleware, projectController.getProjectByPage);
router.get("/:id", authMiddleware, projectController.getProjectById);
router.get("/update/:id", authMiddleware, projectController.updateProject);
router.get("/delete/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
