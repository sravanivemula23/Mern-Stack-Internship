// Task schema: describes how a to-do item is stored in MongoDB
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 100 },
    description: { type: String, trim: true, default: "" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("Task", taskSchema);
