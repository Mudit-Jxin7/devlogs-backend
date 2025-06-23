const express = require("express");
const router = express.Router();
const Log = require("../model/Log");

// POST /logs – Add or update entries
router.post("/", async (req, res) => {
  const { id, date, entries } = req.body;

  try {
    const existing = await Log.findOne({ id });

    if (existing) {
      existing.entries.push(...entries);
      await existing.save();
      return res
        .status(200)
        .json({ message: "Entries appended", log: existing });
    }

    const newLog = new Log({ id, date, entries });
    await newLog.save();
    res.status(201).json({ message: "Log created", log: newLog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /logs – All logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /logs/:date – Get by date
router.get("/:date", async (req, res) => {
  try {
    const log = await Log.findOne({ id: req.params.date });
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

// DELETE /logs/:date – Delete log by date
router.delete("/:date", async (req, res) => {
  try {
    const deleted = await Log.findOneAndDelete({ id: req.params.date });

    if (!deleted) {
      return res.status(404).json({ message: "No log found for this date" });
    }

    res.json({ message: "Log deleted", deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
