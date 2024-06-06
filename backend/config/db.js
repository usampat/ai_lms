const mongoose = require("mongoose");

const connectDB = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
