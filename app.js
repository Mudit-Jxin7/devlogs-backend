require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logsRouter = require("./routes/logs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use("/logs", logsRouter);
app.use(express.static("public"));
app.use(cors());

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
