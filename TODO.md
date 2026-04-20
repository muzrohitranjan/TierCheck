# Railway Strict PORT Fix TODO

✅ Step 1: Plan approved - Edit backend/server.js (remove PORT fallback to 3001)

**Remaining Steps:**
- [ ] Step 2: Edit backend/server.js → `const PORT = process.env.PORT;`
- [ ] Step 3: Git commit/push
  - `git add .`
  - `git commit -m \"fix: strict process.env.PORT for Railway (no fallback)\""
  - `git push`
- [ ] Step 4: `cd backend && railway up`
- [ ] Step 5: Verify Railway logs (dynamic PORT, app accessible)
