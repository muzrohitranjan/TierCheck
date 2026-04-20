const API_BASE = process.env.API_BASE || 'http://localhost:3001/api';

const apiFetch = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API fetch error:', err);
    return [];
  }
};

const fetchColleges = async (search = '') => {
  const colleges = await apiFetch(`/colleges?search=${encodeURIComponent(search)}`);
  // Augment with tierInfo for UI
  return colleges.map(c => ({
    ...c,
    tierInfo: window.tierInfo[c.tier] || window.tierInfo[3]
  }));
};

const fetchCompanies = async (filter = 'all') => apiFetch(`/companies?filter=${filter}`);
const fetchJobs = async (worth = 'all') => apiFetch(`/jobs?worth=${worth}`);
const submitData = async (data) => apiFetch('/submit', { method: 'POST', body: JSON.stringify(data) });

window.api = { fetchColleges, fetchCompanies, fetchJobs, submitData };
