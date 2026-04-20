# TierCheck Deployment TODO - Production Live Setup

**Status: ✅ Backend Core Complete | 📋 Deployment Plan Approved**

## Deployment Progress Tracker

### Phase 1: GitHub Repo Setup [TODO]
- [ ] Create TODO.md with steps (current)
- [ ] `git init`
- [ ] Create .gitignore
- [ ] `git add . && git commit -m "Initial TierCheck commit"`
- [ ] `git remote add origin <GITHUB_REPO_URL>`
- [ ] `git branch -M main`
- [ ] `git push -u origin main`

### Phase 2: MongoDB Atlas [Waiting User]
- [ ] User creates free M0 cluster
- [ ] Create DB user/admin
- [ ] Network: Allow 0.0.0.0/0
- [ ] Get MONGO_URI → Set in Railway env
- [ ] Test seed data

### Phase 3: Backend Deploy Railway [After Phase 1-2]
- [ ] Check/install Railway CLI
- [ ] `railway login`
- [ ] `railway link <railway_project>`
- [ ] Set env: MONGO_URI, PORT=3001
- [ ] `railway up`
- [ ] Run seed.js if DB empty
- [ ] Get BACKEND_URL

### Phase 4: Frontend Update & Vercel [After Phase 3]
- [ ] Edit data-api.js: API_BASE = '<BACKEND_URL>/api'
- [ ] Commit/push
- [ ] Vercel CLI: vercel --prod
- [ ] Update backend CORS if needed

### Phase 5: Verify Live Flow [Final]
- [ ] College search ✅
- [ ] Companies filters ✅
- [ ] Jobs dynamic ✅
- [ ] Submit → DB persist ✅
- [ ] Share FRONTEND_URL + BACKEND_URL

**Next Step:** User provides GitHub repo URL + MONGO_URI. Then execute Phase 1 git setup.

