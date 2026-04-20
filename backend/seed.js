require('dotenv').config();
const mongoose = require('mongoose');

const College = require('./models/College');
const Company = require('./models/Company');
const Job = require('./models/Job');

const collegesData = [
  { name: 'IIT Madras', tier: 1 },
  { name: 'IIT Delhi', tier: 1 },
  { name: 'IIT Bombay', tier: 1 },
  { name: 'IIT Kanpur', tier: 1 },
  { name: 'IIT Kharagpur', tier: 1 },
  { name: 'NIT Trichy', tier: 1 },
  { name: 'BITS Pilani', tier: 1 },
  { name: 'VIT Vellore', tier: 1 },
  { name: 'IIIT Hyderabad', tier: 1 },
  { name: 'NIT Surathkal', tier: 1 }
];

const companiesData = [
  {
    name: 'Google',
    badge: 'Tier 1',
    badgeClass: 't1',
    t1: 80,
    t2: 15,
    t3: 5,
    t4: 0,
    roles: [
      { role: 'SDE', tier: 'Tier 1 Only' },
      { role: 'Data Analyst', tier: 'Tier 1 & 2' }
    ]
  },
  {
    name: 'Microsoft',
    badge: 'Tier 1 & 2',
    badgeClass: 't2',
    t1: 65,
    t2: 30,
    t3: 5,
    t4: 0,
    roles: [
      { role: 'SDE II', tier: 'Tier 1 & 2' },
      { role: 'PM', tier: 'Tier 1 Only' }
    ]
  },
  {
    name: 'Amazon',
    badge: 'Tier 1 & 2',
    badgeClass: 't2',
    t1: 60,
    t2: 35,
    t3: 5,
    t4: 0,
    roles: [
      { role: 'SDE I', tier: 'Tier 1 & 2' },
      { role: 'Operations', tier: 'Tier 2 & 3' }
    ]
  },
  {
    name: 'Flipkart',
    badge: 'Tier 1 & 2',
    badgeClass: 't2',
    t1: 55,
    t2: 40,
    t3: 5,
    t4: 0,
    roles: [
      { role: 'Data Scientist', tier: 'Tier 1 & 2' },
      { role: 'Intern', tier: 'Tier 2 & 3' }
    ]
  },
  {
    name: 'Infosys',
    badge: 'All Tiers',
    badgeClass: 't3',
    t1: 20,
    t2: 35,
    t3: 30,
    t4: 15,
    roles: [
      { role: 'Systems Engineer', tier: 'All Tiers' },
      { role: 'Senior SDE', tier: 'Tier 1 & 2' }
    ]
  }
];

const jobsData = [
  { company: 'Google', role: 'SDE', location: 'Bangalore', tier: 'T1', worth: 'yes' },
  { company: 'Microsoft', role: 'SDE II', location: 'Hyderabad', tier: 'T1 & T2', worth: 'yes' },
  { company: 'Amazon', role: 'SDE I', location: 'Bangalore', tier: 'T1 & T2', worth: 'yes' },
  { company: 'Flipkart', role: 'Data Scientist', location: 'Bangalore', tier: 'T1 & T2', worth: 'maybe' },
  { company: 'Infosys', role: 'Systems Engineer', location: 'Pune', tier: 'All Tiers', worth: 'yes' }
];

async function seedDatabase(options = {}) {
  const {
    mongoUri = process.env.MONGO_URI,
    reset = false,
    connect = false,
    disconnect = false
  } = options;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not set');
  }

  if (connect && mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }

  try {
    const before = {
      colleges: await College.countDocuments(),
      companies: await Company.countDocuments(),
      jobs: await Job.countDocuments()
    };

    const inserted = {
      colleges: 0,
      companies: 0,
      jobs: 0
    };

    if (reset) {
      await College.deleteMany({});
      await Company.deleteMany({});
      await Job.deleteMany({});
    }

    const shouldInsertColleges = reset || before.colleges === 0;
    const shouldInsertCompanies = reset || before.companies === 0;
    const shouldInsertJobs = reset || before.jobs === 0;

    if (shouldInsertColleges) {
      const colleges = collegesData.map((college) => ({
        ...college,
        verified: true
      }));
      await College.insertMany(colleges);
      inserted.colleges = colleges.length;
    }

    if (shouldInsertCompanies) {
      const companies = companiesData.map((company) => ({
        ...company,
        verified: true
      }));
      await Company.insertMany(companies);
      inserted.companies = companies.length;
    }

    if (shouldInsertJobs) {
      await Job.insertMany(jobsData);
      inserted.jobs = jobsData.length;
    }

    const after = {
      colleges: await College.countDocuments(),
      companies: await Company.countDocuments(),
      jobs: await Job.countDocuments()
    };

    return {
      before,
      inserted,
      after,
      changed: inserted.colleges > 0 || inserted.companies > 0 || inserted.jobs > 0
    };
  } finally {
    if (disconnect && mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

async function runSeedCli() {
  try {
    console.log('🔄 Seeding database...');
    const result = await seedDatabase({
      reset: true,
      connect: true,
      disconnect: true
    });

    console.log(`✅ Colleges before: ${result.before.colleges}, after: ${result.after.colleges}, inserted: ${result.inserted.colleges}`);
    console.log(`✅ Companies before: ${result.before.companies}, after: ${result.after.companies}, inserted: ${result.inserted.companies}`);
    console.log(`✅ Jobs before: ${result.before.jobs}, after: ${result.after.jobs}, inserted: ${result.inserted.jobs}`);
    console.log('🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  runSeedCli();
}

module.exports = {
  seedDatabase,
  collegesData,
  companiesData,
  jobsData
};
