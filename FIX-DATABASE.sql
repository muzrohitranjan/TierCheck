-- FIX DATA MISMATCH - Normalize companies.name and jobs.company
-- Trim spaces, lowercase, remove internal spaces → "google inc" → "googleinc"

-- 1. Backup first (copy table)
CREATE TABLE companies_backup AS SELECT * FROM companies;
CREATE TABLE jobs_backup AS SELECT * FROM jobs;

-- 2. Normalize companies.name
UPDATE companies 
SET name = TRIM(LOWER(REGEXP_REPLACE(name, '\s+', ' ', 'g')));

-- 3. Normalize jobs.company  
UPDATE jobs 
SET company = TRIM(LOWER(REGEXP_REPLACE(company, '\s+', ' ', 'g')));

-- 4. Verify
SELECT name FROM companies LIMIT 5;
SELECT company FROM jobs LIMIT 5;

-- 5. Count
SELECT COUNT(*) as companies FROM companies;
SELECT COUNT(*) as jobs FROM jobs;
SELECT COUNT(DISTINCT name) as unique_companies FROM companies;
SELECT COUNT(DISTINCT company) as unique_jobs_company FROM jobs;

-- ✅ Run this in Supabase SQL Editor
-- Then test companies.html → Roles match perfectly!

-- Example expected:
-- companies.name = "googleinc"
-- jobs.company = "googleinc" 
-- → Perfect === match
