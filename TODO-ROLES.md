# Role Mismatch Fix Tracker

## ✅ APPROVED - Companies + Jobs Table Mapping

### 1. [x] Create TODO-ROLES.md
### 2. [x] Rewrite companies.js
   - Global jobs = await window.api.fetchJobs()
   - normalize(name) = name?.trim().toLowerCase()
   - company.jobRoles = jobs.filter(j => normalize(j.company) === normalize(company.name)).map(j => ({role:j.role, tier:j.tier}))
   - Replace c.roles → c.jobRoles in template
   - DEBUG logs: "Google → X matching jobs"
### 3. [x] data-api.js colleges: Remove ALL limits/filters → raw Supabase
### 4. [ ] Test: companies.html F12 → "Google → 2 matching jobs"
### 5. [ ] Push GitHub
### 6. [FINAL] attempt_completion
