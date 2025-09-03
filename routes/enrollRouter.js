const enrollController = require("../controllers/enrollController");
const express = require("express");
const router = express.Router();

router.post("/add", enrollController.addEnroll);
router.post("/get", enrollController.getEnroll);

module.exports = router;
