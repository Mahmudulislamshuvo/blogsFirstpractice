const dbUsername = "mahmudulislammern";
const dbPassword = "oh6galOV5VZv7Kqy";
const ConnectionURL =
  "mongodb+srv://mahmudulislammern:oh6galOV5VZv7Kqy@cluster0.qs59q.mongodb.net";

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoDbinstense = mongoose.connect(ConnectionURL);
    console.log(mongoDbinstense);
  } catch (error) {
    console.log(error, "Error from connect db");
  }
};

module.exports = { connectDB };
