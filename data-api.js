// TierCheck Supabase API Client - Backend FREE
// Loads colleges, companies, jobs from your Supabase tables

const headers = {
  'apikey': window.SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${window.SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
};

const supabaseFetch = async (table, extraQuery = '') => {
  try {
    const url = `${window.SUPABASE_URL}/rest/v1/${table}${extraQuery}`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ ${table}: ${data.length} items`);
    return data;
  } catch (error) {
    console.error(`❌ Supabase ${table} failed:`, error);
    return []; // Never breaks UI
  }
};

// Production API Functions
window.api = {
  async fetchColleges(search = '') {
    let colleges = await supabaseFetch('colleges');
    if (search) {
      colleges = colleges.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return colleges.slice(0, 20);
  },

  async fetchCompanies(filter = 'all') {
    let companies = await supabaseFetch('companies');
    if (filter !== 'all') {
      companies = companies.filter(c => c.tier === filter);
    }
    return companies;
  },

  async fetchJobs(worth = 'all') {
    let jobs = await supabaseFetch('jobs');
    if (worth !== 'all') {
      jobs = jobs.filter(j => j.worth === worth);
    }
    return jobs;
  },

  async submitData(data) {
    try {
      const response = await fetch(`${window.SUPABASE_URL}/rest/v1/submissions`, {
        method: 'POST',
        headers,
        body: JSON.stringify([data])
      });
      return response.ok;
    } catch {
      console.error('Submit failed');
      return false;
    }
  }
};

console.log('🚀 TierCheck Supabase API Ready - No Backend Needed!');

