-- DISABLE RLS FOR ALL TierCheck TABLES (Run in Supabase SQL Editor)
-- Makes ALL data public readable

-- 1. Disable RLS on ALL tables
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE colleges DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;

-- 2. Create PUBLIC READ policies (backup)
DROP POLICY IF EXISTS "Public read" ON companies;
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read" ON colleges;
CREATE POLICY "Public read colleges" ON colleges FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read" ON jobs;
CREATE POLICY "Public read jobs" ON jobs FOR SELECT USING (true);

-- 3. Verify (run SELECT to test)
SELECT count(*) FROM companies;
SELECT count(*) FROM colleges;
SELECT count(*) FROM jobs;

-- SUCCESS = Full data loads in frontend!
