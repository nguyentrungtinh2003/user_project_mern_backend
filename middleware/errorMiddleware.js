const { MulterError } = require("multer");

exports.notFound = (req, res, next) =>
  res.status(404).json({ message: "Route not found" });

exports.errorHandler = (err, req, res, next) => {
  if (err instanceof MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || "Server errror" });
  }
  next();
};
