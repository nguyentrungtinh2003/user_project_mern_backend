const projectController = require("../controllers/projectController");
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, projectController.addProject);
router.get("/all", authMiddleware, projectController.getAllProject);
router.get("/page", authMiddleware, projectController.getProjectByPage);
router.get("/:id", authMiddleware, projectController.getProjectById);
router.put("/update/:id", authMiddleware, projectController.updateProject);
router.delete("/delete/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
