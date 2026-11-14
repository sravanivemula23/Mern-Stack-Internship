// Note schema. Every note belongs to exactly one user (the "user" field).
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 100 },
    content: { type: String, required: [true, "Content is required"], trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
