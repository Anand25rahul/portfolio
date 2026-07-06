const express = require('express');
const router = express.Router();
const Timeline = require('../models/Timeline');

// GET /api/timeline — list all (sorted by order)
router.get('/', async (req, res) => {
  try {
    const entries = await Timeline.find().sort({ order: 1 });
    res.json({ success: true, count: entries.length, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/timeline — create
router.post('/', async (req, res) => {
  try {
    const entry = await Timeline.create(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/timeline/:id — update
router.put('/:id', async (req, res) => {
  try {
    const entry = await Timeline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' });
    res.json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/timeline/:id — delete
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Timeline.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' });
    res.json({ success: true, message: 'Timeline entry deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
