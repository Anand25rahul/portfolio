const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Routes ──
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/timeline', require('./routes/timelineRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/certifications', require('./routes/certificationRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const User = require('./models/User');

// Helper to auto-seed default admin user if missing
async function ensureDefaultAdmin() {
  try {
    const adminExists = await User.findOne({ username: 'anand' });
    if (!adminExists) {
      await User.create({ username: 'anand', password: '123456' });
      console.log('👤 Auto-seeded default admin user: anand / 123456');
    }
  } catch (err) {
    console.error('⚠️ Could not verify default admin user:', err.message);
  }
}

// ── Database Connection & Server Start ──
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    await ensureDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Portfolio API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
