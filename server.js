const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

db(process.env.MONGO_URI);

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);

app.listen(process.env.PORT | 5000, () => {
  console.log("Server running on port ", process.env.PORT);
});
