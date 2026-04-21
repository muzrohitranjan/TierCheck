# TierCheck Supabase Data Fix - Progress Tracker

## ✅ PLAN APPROVED - Step-by-step implementation

### 1. [x] Create this TODO.md
### 2. [x] Update supabase-complete-setup.sql
   - Enhance companies schema (add badgeClass, t1-4, roles JSONB)
   - Add 100+ colleges from static data
   - Add 20+ rich companies with t1/t2, roles array
### 3. [] User: Run SQL in Supabase Dashboard → SQL Editor → Verify data
   ```
   SELECT COUNT(*) FROM colleges; -- Should be 100+
   SELECT COUNT(*) FROM companies; -- 20+
   SELECT * FROM companies LIMIT 3;
   ```
### 4. [x] Patch data-api.js
   - Normalize tier casing/mapping
   - Parse roles JSON
   - Default percentages
### 5. [x] Patch companies.js
   - Safe rendering fallbacks
### 6. [] Create colleges.js (if missing)
### 7. [] Test companies.html 
   ```
   Open companies.html → Check console: "FETCHED companies: 20+"
   All colleges visible, roles populated, filters work
   ```
### 8. [] [FINAL] attempt_completion

**🚀 Run SQL (Step 3) → Test companies.html → Fixed!**
