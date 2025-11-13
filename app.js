const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

//service file local
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    maxAge: "7d",
    fallthrough: true,
  })
);

//mount routes (versioned)
app.use("/api/v1", routes);

//404 + error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
