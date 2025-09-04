const enrollController = require("../controllers/enrollController");
const express = require("express");
const router = express.Router();

router.post("/add", enrollController.addEnroll);
router.get("/get", enrollController.getEnroll);

module.exports = router;
