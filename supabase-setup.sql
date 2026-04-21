-- TierCheck Supabase Schema + Sample Data
-- Run in Supabase SQL Editor: supabase.com/dashboard > SQL Editor > New Query

-- Enable RLS (Row Level Security) OFF for public reads
ALTER POLICY "Enable read access for all users" ON companies FOR SELECT USING (true);
ALTER POLICY "Enable read access for all users" ON colleges FOR SELECT USING (true);
ALTER POLICY "Enable read access for all users" ON jobs FOR SELECT USING (true);

-- 1. COMPANIES TABLE (from backend seed.js)
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT,
  badgeClass TEXT,
  t1 INTEGER DEFAULT 0,
  t2 INTEGER DEFAULT 0,
  t3 INTEGER DEFAULT 0,
  t4 INTEGER DEFAULT 0,
  roles JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample Companies Data (50+ from data.js)
INSERT INTO companies (name, badge, badgeClass, t1, t2, t3, t4, roles) VALUES
('Google', 'Tier 1 Only', 't1', 80, 15, 5, 0, '[{"role":"SDE","tier":"Tier 1 Only"},{"role":"Data Analyst","tier":"Tier 1 & 2"}]'),
('Microsoft', 'Tier 1 & 2', 't2', 65, 30, 5, 0, '[{"role":"SDE","tier":"Tier 1 & 2"},{"role":"PM","tier":"Tier 1 Only"}]'),
('Amazon', 'Tier 1 & 2', 't2', 60, 35, 5, 0, '[{"role":"SDE I","tier":"Tier 1 & 2"},{"role":"Operations","tier":"Tier 2 & 3"}]'),
('Flipkart', 'Tier 1 & 2', 't2', 55, 40, 5, 0, '[{"role":"Data Scientist","tier":"Tier 1 & 2"}]'),
('Infosys', 'Open for All', 't3', 20, 35, 30, 15, '[{"role":"Systems Engineer","tier":"All Tiers"}]'),
('TCS', 'Open for All', 't3', 15, 30, 35, 20, '[{"role":"Assistant Systems Engineer","tier":"All Tiers"}]'),
('Wipro', 'Open for All', 't3', 10, 25, 40, 25, '[{"role":"Project Engineer","tier":"All Tiers"}]'),
('Adobe', 'Tier 1 & 2', 't2', 60, 35, 5, 0, '[{"role":"SDE","tier":"Tier 1 & 2"}]'),
('Apple', 'Tier 1 Only', 't1', 75, 20, 5, 0, '[{"role":"SDE","tier":"Tier 1 Only"}]'),
('Meta', 'Tier 1 Only', 't1', 85, 10, 5, 0, '[{"role":"SDE","tier":"Tier 1 Only"}]'),
('IBM', 'Tier 1 & 2', 't2', 50, 40, 10, 0, '[{"role":"Systems Engineer","tier":"Tier 1 & 2"}]'),
('Goldman Sachs', 'Tier 1 Only', 't1', 90, 8, 2, 0, '[{"role":"Analyst","tier":"Tier 1 Only"}]'),
('Salesforce', 'Tier 1 & 2', 't2', 72, 22, 6, 0, '[{"role":"SDE","tier":"Tier 1 & 2"}]');

-- 2. COLLEGES TABLE
CREATE TABLE IF NOT EXISTS colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tier INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample Colleges (10+ Tier 1 from data.js)
INSERT INTO colleges (name, tier) VALUES
('IIT Madras', 1),
('IIT Delhi', 1),
('IIT Bombay', 1),
('IIT Kanpur', 1),
('IIT Kharagpur', 1),
('NIT Trichy', 1),
('BITS Pilani', 1),
('VIT Vellore', 1),
('IIIT Hyderabad', 1),
('NIT Surathkal', 1),
('IIT Roorkee', 1),
('IIT Guwahati', 1);

-- 3. JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  tier TEXT,
  worth TEXT CHECK (worth IN ('yes', 'maybe', 'no')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample Jobs
INSERT INTO jobs (company, role, location, tier, worth) VALUES
('Google', 'Software Engineer', 'Bangalore', 'T1', 'yes'),
('Microsoft', 'SDE II', 'Hyderabad', 'T1 & T2', 'yes'),
('Amazon', 'SDE I', 'Bangalore', 'T1 & T2', 'yes'),
('Flipkart', 'Data Scientist', 'Bangalore', 'T1 & T2', 'maybe'),
('Infosys', 'Systems Engineer', 'Pune', 'All Tiers', 'yes'),
('TCS', 'Assistant Systems Engineer', 'Chennai', 'All Tiers', 'yes'),
('Adobe', 'UX Designer', 'Noida', 'T1 & 2', 'maybe');

-- Verify data loaded
SELECT 'Companies loaded:', COUNT(*) FROM companies UNION ALL
SELECT 'Colleges loaded:', COUNT(*) FROM colleges UNION ALL  
SELECT 'Jobs loaded:', COUNT(*) FROM jobs;

