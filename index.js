const express = require("express");
const app = express();
const { connectDB } = require("./Dbconnect/MongoDbConfig");

connectDB();

const BlogModel = require("./Model/Blog.Model");

app.post("/createBlog", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error, "error from creating controller");
  }
});

app.listen(3000, () => {
  console.log("server running port 3000");
});
