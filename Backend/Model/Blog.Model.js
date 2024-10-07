const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("blog", BlogSchema);
