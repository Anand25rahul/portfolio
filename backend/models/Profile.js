const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subTitle: {
    type: String,
    required: [true, 'Hero subtitle is required']
  },
  aboutBio: {
    type: String,
    required: [true, 'About bio paragraph is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  linkedinUrl: {
    type: String,
    default: '#'
  },
  githubUrl: {
    type: String,
    default: '#'
  },
  profilePhoto: {
    type: String,
    default: '/profile.jpg'
  },
  cvPdf: {
    type: String,
    default: '/RAHUL_ANAND_CV.pdf'
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
