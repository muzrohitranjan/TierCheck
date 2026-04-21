# Fix ALL Supabase Data Issues - Full Rows

## Status: Data truncated by pagination/mapping

### 1. [ ] data-api.js - Range header + no limits
```
Range: "0-999" → all rows
Remove .slice(), .limit()
Keep user filters only
```

### 2. [ ] companies.js - Case-insensitive job matching
```
roles: jobs.filter(job.company.toLowerCase() === c.name.toLowerCase())
```

### 3. [ ] college.html - Remove inline limits
```
Remove .slice(0,6), .slice(0,20)
```

### 4. [ ] Remove fallbacks
```
No window.colleges fallback
Pure Supabase
```

### 5. [ ] Debug logs everywhere
```
console.log("FULL colleges:", colleges.length)
```

**Goal: ALL Supabase rows visible!**
