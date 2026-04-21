// Supabase API Client for TierCheck - Replaces Railway backend
// Usage: window.api.fetchCompanies(), window.api.fetchColleges() etc.

const supabaseFetch = async (endpoint, options = {}) => {
  try {
    const url = `${window.SUPABASE_URL}/rest/v1${endpoint}?select=*`;
    const res = await fetch(url, {
      headers: SUPABASE_HEADERS,
      ...options
    });
    if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
    const data = await res.json();
    console.log(`Supabase ${endpoint}:`, data.length, 'items');
    return data;
  } catch (err) {
    console.error('Supabase fetch failed:', err);
    // Fallback to static data
    if (endpoint === '/companies') return window.companies;
    if (endpoint === '/colleges') return window.colleges;
    if (endpoint === '/jobs') return window.jobs;
    return [];
  }
};

window.api = {
  fetchColleges: async (search = '') => {
    let colleges = await supabaseFetch('/colleges');
    if (search) colleges = colleges.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    return colleges.map(c => ({
      ...c,
      tierInfo: window.tierInfo[c.tier] || window.tierInfo[3]
    })).slice(0, 20);
  },
  
  fetchCompanies: async (filter = 'all') => {
    let companies = await supabaseFetch('/companies');
    if (filter !== 'all') companies = companies.filter(c => c.badgeClass === filter);
    return companies;
  },
  
  fetchJobs: async (worth = 'all') => {
    let jobs = await supabaseFetch('/jobs');
    if (worth !== 'all') jobs = jobs.filter(j => j.worth === worth);
    return jobs;
  },
  
  submitData: async (data) => {
    try {
      const res = await fetch(`${window.SUPABASE_URL}/rest/v1/submissions`, {
        method: 'POST',
        headers: SUPABASE_HEADERS,
        body: JSON.stringify([data])
      });
      return res.ok;
    } catch {
      console.error('Submit failed');
      return false;
    }
  }
};

