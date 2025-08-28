const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongodB connected");
  } catch (error) {
    console.log("Error connected DB ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
