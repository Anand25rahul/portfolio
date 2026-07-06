const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Timeline = require('../models/Timeline');
const Certification = require('../models/Certification');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, title, clearData } = req.body;
    if (!username || !password || !name || !title) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ username: username.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Create user
    const newUser = await User.create({
      username: username.toLowerCase(),
      password
    });

    // Create/update profile details
    let profile = await Profile.findOne();
    const profileFields = {
      name,
      title,
      subTitle: `Developer portfolio website of ${name}. Built with React, Node.js, and MongoDB.`,
      aboutBio: `I am ${name}, a professional ${title}. This is my customizable developer portfolio showcase.`,
      email: 'user@example.com',
      linkedinUrl: '#',
      githubUrl: '#'
    };

    if (!profile) {
      await Profile.create(profileFields);
    } else {
      await Profile.findByIdAndUpdate(profile._id, profileFields);
    }

    // Clear existing portfolio items to start fresh if requested
    if (clearData) {
      await Project.deleteMany({});
      await Skill.deleteMany({});
      await Timeline.deleteMany({});
      await Certification.deleteMany({});
    }

    res.status(201).json({ success: true, message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
