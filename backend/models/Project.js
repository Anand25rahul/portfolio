const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  desc: {
    type: String,
    required: [true, 'Project description is required']
  },
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'systems'],
    default: 'web'
  },
  icon: {
    type: String,
    default: '📁'
  },
  demoLink: {
    type: String,
    default: '#'
  },
  codeLink: {
    type: String,
    default: '#'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
