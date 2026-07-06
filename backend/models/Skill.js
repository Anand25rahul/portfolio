const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'tools'],
    required: [true, 'Category is required']
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  icon: {
    type: String,
    default: '⚙️'
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
