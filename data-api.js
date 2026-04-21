// TierCheck Supabase Client - EMPTY DATA + RLS DEBUG FIXED
console.log("🔍 data-api.js START", window.SUPABASE_URL);

if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
  console.error("❌ NO CONFIG - FALLBACK");
  window.api = { fetchColleges: () => window.colleges || [], fetchCompanies: () => window.companies || [], fetchJobs: () => window.jobs || [], submitData: () => false };
} else {
  console.log("✅ CONFIG OK");
  
  const headers = {
    'apikey': window.SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${window.SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };

  const supabaseFetch = async (table) => {
    try {
      // ALL DATA + DEBUG JSON
      const url = `${window.SUPABASE_URL}/rest/v1/${table}?select=*`;
      console.log(`🌐 Fetching ${table} →`, url);
      const res = await fetch(url, { headers });
      
      console.log(`${table} status:`, res.status, res.statusText);
      
      if (!res.ok) {
        const errText = await res.text();
        console.error(`❌ ${table} ERROR:`, res.status, errText);
        throw new Error(errText);
      }
      
      const data = await res.json();
      console.log(`📊 RAW ${table} JSON:`, data);
      console.log(`✅ ${table}: ${data.length} items`, data.slice(0,3)); // First 3
      
      return data;
    } catch (err) {
      console.error(`💥 ${table} FAILED:`, err);
      return [];
    }
  };

  window.api = {
    fetchColleges: async (search = '') => {
      const colleges = await supabaseFetch('colleges');
      let filtered = colleges;
      if (search) filtered = colleges.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));
      console.log(`Colleges ${search ? `filtered "${search}": "all"}: ${filtered.length}`);
      return filtered.slice(0,100);
    },
    
    fetchCompanies: async (filter = 'all') => {
      const companies = await supabaseFetch('companies');
      let filtered = companies;
      if (filter !== 'all') {
        filtered = companies.filter(c => c.tier === filter || c.badgeClass === filter);
        console.log(`Companies filter "${filter}": ${filtered.length}/${companies.length}`);
      } else {
        console.log(`Companies ALL: ${filtered.length}`);
      }
      return filtered; // ALL FILTERED (no slice)
    },
    
    fetchJobs: async (worth = 'all') => {
      const jobs = await supabaseFetch('jobs');
      let filtered = jobs;
      if (worth !== 'all') filtered = jobs.filter(j => j.worth === worth);
      console.log(`Jobs ${worth}: ${filtered.length}/${jobs.length}`);
      return filtered;
    },
    
    submitData: async (data) => {
      try {
        const res = await fetch(`${window.SUPABASE_URL}/rest/v1/submissions`, {
          method: 'POST',
          headers,
          body: JSON.stringify([data])
        });
        console.log("Submit status:", res.status);
        return res.ok;
      } catch (err) {
        console.error("Submit error:", err);
        return false;
      }
    }
  };
  
  console.log("🚀 FULL DEBUG Supabase client ready!");
}

console.log("✅ data-api.js COMPLETE");
