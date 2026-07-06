const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Year/period is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Timeline', timelineSchema);
