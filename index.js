const express = require("express");
const app = express();
const { connectDB } = require("./Dbconnect/MongoDbConfig");

connectDB();

const BlogModel = require("./Model/Blog.Model");
const { json } = require("express/lib/response");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    // creating new blog
    const MongoDbSaved = await new BlogModel({
      tittle: tittle,
      description: description,
      authorName: authorName,
    });
    // new data saving
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

app.get("/getalldata", async (req, res) => {
  try {
    const allblog = await BlogModel.find({});
    if (allblog) {
      res.status(200).json({
        error: false,
        data: allblog,
        message: "retrive all blog successful",
      });
    }
  } catch (error) {
    console.log("error from data retrive", error);
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tittle, description, authorName } = req.body;
    const updateblog = await BlogModel.findOneAndUpdate(
      { _id: id },
      {
        ...(tittle && { tittle: tittle }),
        ...(description && { description: description }),
        ...(authorName && { authorName: authorName }),
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateblog);
  } catch (error) {
    console.log("error from data update", error);
    res.status(455).json({ error: "Data update failed" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await BlogModel.findOneAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      data: deleteItem,
      message: "item Deleted",
    });
  } catch (error) {
    console.log("from delete error", error);
  }
});

app.listen(3000, () => {
  console.log("server running port 3000");
});
