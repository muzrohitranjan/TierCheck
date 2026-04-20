require('dotenv').config();
const mongoose = require('mongoose');

const College = require('./models/College');
const Company = require('./models/Company');
const Job = require('./models/Job');

// Hardcoded data for seed
const collegesData = [
  { name: "IIT Madras", tier: 1 },
  { name: "IIT Delhi", tier: 1 },
  { name: "IIT Bombay", tier: 1 },
  { name: "IIT Kanpur", tier: 1 },
  { name: "IIT Kharagpur", tier: 1 },
  { name: "NIT Trichy", tier: 1 },
  { name: "BITS Pilani", tier: 1 },
  { name: "VIT Vellore", tier: 1 },
  { name: "IIIT Hyderabad", tier: 1 },
  { name: "NIT Surathkal", tier: 1 }
];

const companiesData = [
  { name: "Google", badge: "Tier 1", badgeClass: "t1", t1: 80, t2: 15, t3: 5, t4: 0 },
  { name: "Microsoft", badge: "Tier 1 & 2", badgeClass: "t2", t1: 65, t2: 30, t3: 5, t4: 0 },
  { name: "Amazon", badge: "Tier 1 & 2", badgeClass: "t2", t1: 60, t2: 35, t3: 5, t4: 0 },
  { name: "Flipkart", badge: "Tier 1 & 2", badgeClass: "t2", t1: 55, t2: 40, t3: 5, t4: 0 },
  { name: "Infosys", badge: "All Tiers", badgeClass: "t3", t1: 20, t2: 35, t3: 30, t4: 15 }
];

const jobsData = [
  { company: "Google", role: "SDE", location: "Bangalore", tier: "T1", worth: "yes" },
  { company: "Microsoft", role: "SDE II", location: "Hyderabad", tier: "T1 & T2", worth: "yes" },
  { company: "Amazon", role: "SDE I", location: "Bangalore", tier: "T1 & T2", worth: "yes" },
  { company: "Flipkart", role: "Data Scientist", location: "Bangalore", tier: "T1 & T2", worth: "maybe" },
  { company: "Infosys", role: "Systems Engineer", location: "Pune", tier: "All Tiers", worth: "yes" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🔄 Seeding database...');
    
    await College.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    
    const colleges = collegesData.map(c => ({ name: c.name, tier: c.tier, verified: true }));
    await College.insertMany(colleges);
    console.log(`✅ Seeded ${colleges.length} colleges`);
    
    await Company.insertMany(companiesData.map(c => ({ ...c, verified: true })));
    console.log(`✅ Seeded ${companiesData.length} companies`);
    
    await Job.insertMany(jobsData);
    console.log(`✅ Seeded ${jobsData.length} jobs`);
    
    console.log('🎉 Seed complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  });
