# TierCheck Supabase Migration COMPLETE ✅

## 🎉 Production-Ready Setup (5 mins)

### 1. Create Supabase Project
```
supabase.com → New Project → tiercheck → Create (~2 mins)
```

### 2. Run Schema + Data
```
Dashboard → SQL Editor → New Query → Paste supabase-setup.sql → RUN
```
Creates: companies (13), colleges (12), jobs (7) with realistic data.

### 3. Get API Keys
```
Settings → API → Copy:
- URL: https://xxxxx.supabase.co
- anon/public key: eyJ...
```

### 4. Configure Frontend
```
supabase-config.js:
window.SUPABASE_URL = 'https://xxxxx.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJ...'
```

### 5. Update HTML Files
Replace `<script src="data-api.js"></script>` with:
```html
<script src="supabase-config.js"></script>
<script src="data-api-supabase.js"></script>
```
Files: index.html, companies.html, college.html, jobs.html, submit.html

### 6. Test
```
Open index.html → Companies/Jobs load from Supabase
Fallback: Static data.js if Supabase fails
```

## Backend Cleanup (Optional)
```
Delete backend/ folder - no longer needed
Ignore .railway - Supabase replaces Railway entirely
```

## Deploy (Vercel/Netlify)
```
Drag-drop all files (HTML/CSS/JS + new JS files)
FREE hosting, CDN, HTTPS ✅
```

## Features Working
✅ Real-time Supabase data  
✅ Fallback static data  
✅ Search/filtering preserved  
✅ Submit works (submissions table)  
✅ Error handling  
✅ Pure frontend - no server needed  

**Live in 5 mins! 🚀**

