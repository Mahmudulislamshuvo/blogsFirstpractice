const express = require("express");
const app = express();
const { connectDB } = require("./Dbconnect/MongoDbConfig");

connectDB();

const BlogModel = require("./Model/Blog.Model");
const { json } = require("express/lib/response");

app.use(express.json());

app.post("/createBlog", async (req, res) => {
  try {
    const { tittle, description, authorName } = req.body;
    if (!tittle) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Tittle missing",
        error: true,
      });
    }
    if (!description) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "description missing",
        error: true,
      });
    }
    if (!authorName) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "authorName missing",
        error: true,
      });
    }
    const existingBlog = await BlogModel.find({
      tittle: tittle,
    });
    console.log(existingBlog);

    if (existingBlog?.length > 0) {
      return res.status(200).json({
        success: false,
        data: null,
        message: "Already exit this blog",
        error: true,
      });
    }
    const MongoDbSaved = await new BlogModel({
      tittle: tittle,
      description: description,
      authorName: authorName,
    });
    const savedData = MongoDbSaved.save();
    return res.status(200).json({
      success: true,
      data: MongoDbSaved,
      message: "data uploaded",
      error: false,
    });
  } catch (error) {
    console.log(error, "error from creating controller");
  }
});

app.listen(3000, () => {
  console.log("server running port 3000");
});
