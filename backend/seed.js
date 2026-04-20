require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const College = require('./models/College');
const Company = require('./models/Company');
const Job = require('./models/Job');

// Import data from frontend
const dataPath = path.join(__dirname, '../data.js');
let rawData;
try {
  rawData = fs.readFileSync(dataPath, 'utf8');
} catch (err) {
  console.error('data.js not found. Using temp_data.js');
  rawData = fs.readFileSync(path.join(__dirname, '../temp_data.js'), 'utf8');
}

const dataMatch = rawData.match(/window\.colleges\s*=\s*(\[[\s\S]*?\]);/);
const collegesData = dataMatch ? JSON.parse(dataMatch[1]) : [];

const companiesData = JSON.parse(rawData.match(/window\.companies\s*=\s*(\[[\s\S]*?\]);/)[1]);
const jobsData = JSON.parse(rawData.match(/window\.jobs\s*=\s*(\[[\s\S]*?\]);/)[1]);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🔄 Seeding database...');
    
    // Clear existing data
    await College.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    
    // Seed Colleges
    const colleges = collegesData.map(c => ({ name: c.name, tier: c.tier, verified: true }));
    await College.insertMany(colleges);
    console.log(`✅ Seeded ${colleges.length} colleges`);
    
    // Seed Companies
    await Company.insertMany(companiesData.map(c => ({ ...c, verified: true })));
    console.log(`✅ Seeded ${companiesData.length} companies`);
    
    // Seed Jobs
    await Job.insertMany(jobsData.map(j => ({ ...j })));
    console.log(`✅ Seeded ${jobsData.length} jobs`);
    
    console.log('🎉 Seed complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  });
