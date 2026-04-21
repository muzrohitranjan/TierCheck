// TierCheck Supabase Client - FIXED Loading Issue
console.log("🔍 data-api.js loading... Checking config:" , window.SUPABASE_URL, window.SUPABASE_ANON_KEY ? "OK" : "MISSING");

if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
  console.error("❌ Supabase config missing - using fallback data");
  window.api = {
    fetchColleges: async () => window.colleges || [],
    fetchCompanies: async () => window.companies || [],
    fetchJobs: async () => window.jobs || [],
    submitData: async () => false
  };
} else {
  console.log("✅ Supabase config OK - connecting...");
  
  const headers = {
    'apikey': window.SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${window.SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };

  const supabaseFetch = async (table) => {
    try {
      const url = `${window.SUPABASE_URL}/rest/v1/${table}`;
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      console.log(`✅ ${table}: ${data.length} items`);
      return data;
    } catch (err) {
      console.error(`❌ ${table} failed:`, err);
      return [];
    }
  };

  window.api = {
    fetchColleges: async (search = '') => {
      let colleges = await supabaseFetch('colleges');
      if (search) colleges = colleges.filter(c => c.name.toLowerCase().includes(search));
      return colleges.slice(0,20);
    },
    fetchCompanies: async (filter = 'all') => {
      let companies = await supabaseFetch('companies');
      if (filter !== 'all') companies = companies.filter(c => c.tier === filter);
      return companies;
    },
    fetchJobs: async (worth = 'all') => {
      let jobs = await supabaseFetch('jobs');
      if (worth !== 'all') jobs = jobs.filter(j => j.worth === worth);
      return jobs;
    },
    submitData: async (data) => {
      try {
        await fetch(`${window.SUPABASE_URL}/rest/v1/submissions`, {
          method: 'POST',
          headers,
          body: JSON.stringify([data])
        });
        return true;
      } catch {
        return false;
      }
    }
  };
  console.log("🚀 Supabase API ready!");
}

console.log("✅ data-api.js loaded successfully");

