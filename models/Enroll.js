const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Schema.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enroll", EnrollSchema);
