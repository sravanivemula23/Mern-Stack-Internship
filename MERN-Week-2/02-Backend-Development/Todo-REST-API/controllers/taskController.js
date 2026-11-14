// Controllers hold the logic for each endpoint
const mongoose = require("mongoose");
const Task = require("../models/Task");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /api/tasks  -> create a task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.create({ title, description, completed });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks  -> get all tasks (newest first)
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks/:id  -> get one task
exports.getTask = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid task id" });
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id  -> update a task
exports.updateTask = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid task id" });
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true } // return updated doc and run schema validation
    );
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id  -> delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid task id" });
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
