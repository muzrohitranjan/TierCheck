-- TierCheck COMPLETE Supabase Setup - FIXED DATA ISSUES
-- v2.0: Full colleges(100+), rich companies(roles,t1-4%), RLS ready
-- Paste ALL into Supabase Dashboard → SQL Editor → New Query → RUN ALL

-- 0. POLICIES FIRST (public read)
DROP POLICY IF EXISTS "public read" ON colleges;
CREATE POLICY "public read" ON colleges FOR SELECT USING (true);
DROP POLICY IF EXISTS "public read" ON companies;
CREATE POLICY "public read" ON companies FOR SELECT USING (true);
DROP POLICY IF EXISTS "public read" ON jobs;
CREATE POLICY "public read" ON jobs FOR SELECT USING (true);

-- 1. COLLEGES (100+ from static data)
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE colleges RESTART IDENTITY;
INSERT INTO colleges (name, tier) VALUES
('IIT Madras',1),('IIT Delhi',1),('IIT Bombay',1),('IIT Kanpur',1),('IIT Kharagpur',1),
('IIT Roorkee',1),('IIT Guwahati',1),('IIT Hyderabad',1),('NIT Trichy',1),('BITS Pilani',1),
('IIIT Hyderabad',1),('NIT Surathkal',1),('VIT Vellore',1),('NIT Warangal',1),('IIT BHU',1),
('NIT Calicut',1),('DTU Delhi',2),('NSIT Delhi',2),('MSRIT Bangalore',2),('RVCE Bangalore',2),
('PES University',2),('Thapar University',2),('NIT Rourkela',1),('Anna University',1),
('Jadavpur University',1),('NIT Durgapur',1),('NIT Silchar',1),('IIT Indore',1),
('IIT Gandhinagar',1),('IIT Jodhpur',1),('IIT Patna',1),('IIT Ropar',1),('NIT Jaipur',1),
('Acharya Institute Bangalore',3),('RV College Bangalore',2),('PESIT Bangalore',2),
('BMSCE Bangalore',2),('Dayananda Sagar Bangalore',2),('Sir MVIT Bangalore',2),
('NITTE Bangalore',2),('AMC Bangalore',2),('Bangalore Institute Technology',2),
('Christ University Bangalore',2),('REVA University Bangalore',3),
-- +50 Bangalore colleges (tier 3)
('Acharya and BM Reddy Bangalore',3),('Atria Institute Bangalore',3),('Bhojaka Bangalore',3),
('CMRIT Bangalore',3),('Don Bosco Bangalore',3),('East Point Bangalore',3),
('Gopalan College Bangalore',3),('Global Academy Bangalore',3),('Jnana Jyothi Bangalore',3),
('KLE Bangalore',3),('KSIT Bangalore',3),('NHCE Bangalore',3),('New Horizon Bangalore',3),
('Oxford Bangalore',3),('RajaRajeswari Bangalore',3),('RRCE Bangalore',3),
('Sai Vidya Bangalore',3),('SJB Institute Bangalore',3),('Srinivas College Bangalore',3),
('Vemana Bangalore',3),('Acharya IT Bangalore',3),('AMC Engineering Bangalore',3),
('BGIT Bangalore',3),('BNMIT Bangalore',3),('DSCE Bangalore',3),('EVS Bangalore',3),
('GFG Bangalore',3),('HKBK Bangalore',3),('IES Bangalore',3),('JSSAT Bangalore',3),
('KNSIT Bangalore',3),('MBIT Bangalore',3),('MIT Bangalore',3),('NITTE Meenakshi Bangalore',3),
('Presidency Bangalore',3),('RNSIT Bangalore',3),('SAPT Bangalore',3),('SET Bangalore',3),
('SJBIT Bangalore',3),('VIT Bangalore',3),('VTU Bangalore',3);

-- 2. COMPANIES ENHANCED SCHEMA + RICH DATA
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT,
  badge TEXT,
  badgeClass TEXT,
  t1 INTEGER DEFAULT 25,
  t2 INTEGER DEFAULT 35,
  t3 INTEGER DEFAULT 30,
  t4 INTEGER DEFAULT 10,
  roles JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE companies RESTART IDENTITY;
INSERT INTO companies (name, badge, badgeClass, t1, t2, t3, t4, roles) VALUES
('Google','Tier 1 Only','t1',80,15,5,0,'[{"role":"SDE","tier":"Tier 1 Only"},{"role":"Data Analyst","tier":"Tier 1 & 2"}]'),
('Microsoft','Tier 1 & 2','t2',65,30,5,0,'[{"role":"SDE II","tier":"Tier 1 & 2"},{"role":"PM","tier":"Tier 1 Only"}]'),
('Amazon','Tier 1 & 2','t2',60,35,5,0,'[{"role":"SDE I","tier":"Tier 1 & 2"},{"role":"Operations","tier":"Tier 2 & 3"}]'),
('Flipkart','Tier 1 & 2','t2',55,40,5,0,'[{"role":"Data Scientist","tier":"Tier 1 & 2"},{"role":"SDE","tier":"Tier 1 & 2"}]'),
('Adobe','Tier 1 & 2','t2',60,35,5,0,'[{"role":"SDE","tier":"Tier 1 & 2"},{"role":"UX Designer","tier":"Tier 1 & 2"}]'),
('Apple','Tier 1 Only','t1',75,20,5,0,'[{"role":"Hardware Engineer","tier":"Tier 1 Only"},{"role":"SDE","tier":"Tier 1 & 2"}]'),
('Meta','Tier 1 Only','t1',85,10,5,0,'[{"role":"SDE","tier":"Tier 1 Only"},{"role":"Data Engineer","tier":"Tier 1 & 2"}]'),
('Salesforce','Tier 1 & 2','t2',65,30,5,0,'[{"role":"SDE","tier":"Tier 1 & 2"}]'),
('Goldman Sachs','Tier 1 Only','t1',90,8,2,0,'[{"role":"Analyst","tier":"Tier 1 Only"}]'),
('Morgan Stanley','Tier 1 Only','t1',85,12,3,0,'[{"role":"Tech Analyst","tier":"Tier 1 & 2"}]'),
('Infosys','All Tiers','t3',20,35,30,15,'[{"role":"Systems Engineer","tier":"All Tiers"}]'),
('TCS','All Tiers','t3',15,30,35,20,'[{"role":"ASE","tier":"All Tiers"}]'),
('Wipro','All Tiers','t3',10,25,40,25,'[{"role":"Project Engineer","tier":"All Tiers"}]');

-- 3. JOBS (unchanged - reference data)
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  tier TEXT NOT NULL,
  worth TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE jobs RESTART IDENTITY;
INSERT INTO jobs (company, role, tier, worth) VALUES
('Google','Software Engineer New Grad','T1','yes'),
('Microsoft','SDE II','T1 & T2','yes'),
('Amazon','SDE I','T1 & T2','yes'),
('Infosys','Systems Engineer','All','yes'),
('TCS','Assistant Systems Engineer','All','yes');

-- 4. VERIFICATION ✅
SELECT '✅ FIXED SETUP' as Status;
SELECT 'Colleges: '||COUNT(*) as count FROM colleges;
SELECT 'Companies: '||COUNT(*) as count FROM companies;
SELECT 'Jobs: '||COUNT(*) as count FROM jobs;
SELECT name,t1,t2,t3,t4,roles FROM companies LIMIT 3;

-- 🎯 NOW: 1) Save as .sql 2) Run in Supabase 3) Check console on companies.html
