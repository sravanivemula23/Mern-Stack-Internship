// Every query includes { user: req.user.id } so users can only touch THEIR OWN notes.
const mongoose = require("mongoose");
const Note = require("../models/Note");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ user: req.user.id, title, content });
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// GET /api/notes  (only the logged-in user's notes)
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json({ success: true, count: notes.length, data: notes });
  } catch (err) {
    next(err);
  }
};

// GET /api/notes/:id
exports.getNote = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid note id" });
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    // Someone else's note is reported as "not found" so its existence isn't leaked
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid note id" });
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid note id" });
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.json({ success: true, message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};
