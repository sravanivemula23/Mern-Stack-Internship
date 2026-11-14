require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON request bodies

app.get("/", (req, res) => res.json({ success: true, message: "API is running" }));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.use(notFound);     // unknown routes -> 404
app.use(errorHandler); // all errors -> clean JSON

const PORT = process.env.PORT || 5000;
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
);
