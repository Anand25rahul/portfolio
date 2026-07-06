const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET /api/profile
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    // If no profile exists, create a default one
    if (!profile) {
      profile = await Profile.create({
        name: 'Rahul Anand',
        title: 'Software Developer | DevOps & AWS Cloud Engineer',
        subTitle: 'AWS-certified (CLF-C02 & AIF-C01) Developer with experience in Java & React.js, transitioning into DevOps. Specialized in EC2, S3, Docker, Kubernetes, Terraform, and CI/CD pipelines.',
        aboutBio: 'Software Developer with 1+ years of experience in Java and React.js, transitioning to a DevOps & AWS Cloud Engineer role. AWS-certified (CLF-C02 & AIF-C01) with hands-on exposure to Docker, Kubernetes, Terraform, Ansible, Jenkins, Linux, and Git — ready to drive cloud automation and CI/CD pipelines.',
        email: 'anaashutosh888@gmail.com',
        linkedinUrl: 'https://linkedin.com/in/rahul-anand-22a546218',
        githubUrl: 'https://github.com/Anand25rahul'
      });
    }
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/profile
router.put('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
