-- TierCheck Complete Supabase Setup
-- Paste into Supabase Dashboard > SQL Editor > New Query > RUN ALL
-- Compatible PostgreSQL - Ready for your project!

-- 1. ENABLE PUBLIC READ ACCESS (Supabase RLS)
-- Run these first to allow frontend reads
DROP POLICY IF EXISTS "public read" ON colleges;
CREATE POLICY "public read" ON colleges FOR SELECT USING (true);
DROP POLICY IF EXISTS "public read" ON companies;
CREATE POLICY "public read" ON companies FOR SELECT USING (true);
DROP POLICY IF EXISTS "public read" ON jobs;
CREATE POLICY "public read" ON jobs FOR SELECT USING (true);

-- 2. COLLEGES TABLE
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10+ Realistic Colleges
TRUNCATE colleges RESTART IDENTITY; -- Clear existing
INSERT INTO colleges (name, tier) VALUES
('IIT Madras', 1),
('IIT Delhi', 1),
('IIT Bombay', 1),
('IIT Kanpur', 1),
('IIT Kharagpur', 1),
('IIT Roorkee', 1),
('NIT Trichy', 1),
('BITS Pilani', 1),
('VIT Vellore', 2),
('IIIT Hyderabad', 1),
('NIT Surathkal', 1),
('DTU Delhi', 2),
('NSIT Delhi', 2),
('MSRIT Bangalore', 2),
('RV College of Engineering', 2);

-- 3. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT NOT NULL, -- 'T1', 'T1-T2', 'All'
  role TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10+ Realistic Companies  
TRUNCATE companies RESTART IDENTITY;
INSERT INTO companies (name, tier, role) VALUES
('Google', 'T1', 'SDE'),
('Microsoft', 'T1-T2', 'SDE II'),
('Amazon', 'T1-T2', 'SDE I'),
('Flipkart', 'T1-T2', 'Data Scientist'),
('Adobe', 'T1-T2', 'Software Engineer'),
('Apple', 'T1', 'Hardware Engineer'),
('Meta', 'T1', 'Software Engineer'),
('Salesforce', 'T1-T2', 'Developer'),
('Goldman Sachs', 'T1', 'Analyst'),
('Morgan Stanley', 'T1', 'Tech Analyst'),
('Infosys', 'All', 'Systems Engineer'),
('TCS', 'All', 'ASE');

-- 4. JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  tier TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10+ Realistic Jobs
TRUNCATE jobs RESTART IDENTITY;
INSERT INTO jobs (company, role, tier) VALUES
('Google', 'Software Engineer New Grad', 'T1'),
('Microsoft', 'SDE II', 'T1-T2'),
('Amazon', 'SDE I', 'T1-T2'),
('Flipkart', 'SDE I', 'T1-T2'),
('Adobe', 'Associate Software Engineer', 'T1-T2'),
('Infosys', 'Systems Engineer', 'All'),
('TCS', 'Assistant Systems Engineer', 'All'),
('Wipro', 'Project Engineer', 'All'),
('Accenture', 'Associate Software Engineer', 'All'),
('Goldman Sachs', 'New Analyst', 'T1');

-- 5. VERIFY SETUP ✅
SELECT 'Tables Created' as Status;
SELECT COUNT(*) as colleges FROM colleges;
SELECT COUNT(*) as companies FROM companies;
SELECT COUNT(*) as jobs FROM jobs;

-- 🎉 Paste your Supabase URL + anon key into supabase-config.js
-- Open index.html → LIVE DATA!

