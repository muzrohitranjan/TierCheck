require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const College = require('./models/College');
const Company = require('./models/Company');
const Job = require('./models/Job');
const Submission = require('./models/Submission');
const { seedDatabase } = require('./seed');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(helmet());
app.use(cors({ origin: true })); // Allow all origins for API (update with specific Railway domain if needed)
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    const seedResult = await seedDatabase();
    if (seedResult.changed) {
      console.log('🌱 Database was empty. Seeded starter data:', seedResult.inserted);
    } else {
      console.log('ℹ️ Database already contained data. No seeding needed.');
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// PORT validation
if (!PORT) {
  console.error('❌ No PORT environment variable set');
  process.exit(1);
}
console.log(`📡 PORT detected: ${PORT}`);


// Routes
app.get('/api/colleges', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search 
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    const colleges = await College.find(query).limit(20).select('name tier');
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/companies', async (req, res) => {
  try {
    const { filter } = req.query;
    let companies;
    if (filter === 't1' || filter === 't2' || filter === 't3') {
      companies = await Company.find({ badgeClass: filter });
    } else {
      companies = await Company.find();
    }
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const { worth } = req.query;
    const query = worth && worth !== 'all' ? { worth } : {};
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/submit', async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.json({ message: 'Submission received successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'TierCheck Backend API - Ready!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on 0.0.0.0:${PORT}`);
});
