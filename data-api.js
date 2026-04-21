// TierCheck Supabase Client - LOADING + EMPTY DATA FIXED
console.log("🔍 data-api.js LOADING...", new Date().toLocaleTimeString());

if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
  console.error("❌ NO SUPABASE CONFIG - USING FALLBACK");
  window.api = {
    fetchColleges: async () => {
      console.log("Using fallback colleges");
      return window.colleges || [];
    },
    fetchCompanies: async () => {
      console.log("Using fallback companies"); 
      return window.companies || [];
    },
    fetchJobs: async () => {
      console.log("Using fallback jobs");
      return window.jobs || [];
    },
    submitData: async () => {
      console.log("Fallback submit");
      return false;
    }
  };
} else {
  console.log("✅ SUPABASE CONFIG OK - FETCHING");

  const headers = {
    'apikey': window.SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${window.SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };

  const supabaseFetch = async (table) => {
    try {
      console.log(`🌐 SIMPLE QUERY ${table} → select=*`);
      const url = `${window.SUPABASE_URL}/rest/v1/${table}?select=*`;
      const res = await fetch(url, { headers });
      
      console.log(`${table} STATUS:`, res.status, res.statusText);
      
      const dataText = await res.text();
      console.log(`📄 RAW RESPONSE (${dataText.length} chars):`, dataText.substring(0,200));
      
      const data = JSON.parse(dataText);
      console.log(`✅ FETCHED ${table}:`, data.length, "items");
      console.log("FIRST ROW:", data[0] || "EMPTY");
      
      if (data.length === 0) {
        console.warn(`⚠️ ${table} TABLE EMPTY - Check Supabase data`);
      }
      
      return data;
    } catch (error) {
      console.error(`💥 ${table} ERROR:`, error);
      console.error("FULL ERROR:", error.message);
      return [];
    }
  };

  window.api = {
    fetchColleges: async (search = '') => {
      const colleges = await supabaseFetch('colleges');
      let filtered = colleges;
      if (search) filtered = colleges.filter(c => c.name?.toLowerCase().includes(search));
      console.log(`College results (${search || 'all'}): ${filtered.length}`);
      return filtered;
    },
    
    fetchCompanies: async (filter = 'all') => {
      const companies = await supabaseFetch('companies');
      let filtered = companies;
      if (filter !== 'all') {
        filtered = companies.filter(c => c.tier === filter || c.badgeClass === filter);
      }
      console.log(`Company results (${filter}): ${filtered.length}/${companies.length}`);
      return filtered;
    },
    
    fetchJobs: async (worth = 'all') => {
      const jobs = await supabaseFetch('jobs');
      let filtered = jobs;
      if (worth !== 'all') filtered = jobs.filter(j => j.worth === worth);
      console.log(`Job results (${worth}): ${filtered.length}/${jobs.length}`);
      return filtered;
    },
    
    submitData: async (data) => {
      try {
        const res = await fetch(`${window.SUPABASE_URL}/rest/v1/submissions`, {
          method: 'POST',
          headers,
          body: JSON.stringify([data])
        });
        console.log("Submit:", res.status);
        return res.ok;
      } catch (error) {
        console.error("Submit failed:", error);
        return false;
      }
    }
  };
  console.log("🚀 SUPABASE READY - Use window.api.fetchCompanies()");
}

// Hide loading after 3s max
setTimeout(() => {
  const loading = document.querySelector('.loading');
  if (loading && loading.style.display !== 'none') {
    console.log("⏰ LOADING TIMEOUT - Hiding");
    loading.style.display = 'none';
  }
}, 3000);

console.log("✅ data-api.js COMPLETE - Check F12 for debug");
