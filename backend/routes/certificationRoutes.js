const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// GET /api/certifications — list all
router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ createdAt: 1 });
    res.json({ success: true, count: certs.length, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/certifications — create
router.post('/', async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/certifications/:id — update
router.put('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/certifications/:id — delete
router.delete('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
    res.json({ success: true, message: 'Certification deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
