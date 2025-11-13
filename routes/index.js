const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const projectRouter = require("./projectRouter");
const enrollRouter = require("./enrollRouter");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/enroll", enrollRouter);

module.exports = router;
