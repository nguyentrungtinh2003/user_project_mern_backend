const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    projectId: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enroll", EnrollSchema);
