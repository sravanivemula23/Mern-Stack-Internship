const express = require("express");
const { createNote, getNotes, getNote, updateNote, deleteNote } = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect); // every route below requires a valid JWT

router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;
