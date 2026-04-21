// Global job roles cache (companyName → [{role,tier}])
window.jobRoles = {};

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

async function loadJobRoles() {
  try {
    const jobs = await window.api.fetchJobs('all');
    console.log(`📊 FULL JOBS (${jobs.length}) for case-insensitive matching`);
    
    // Normalize all company names
    const normalizedJobs = jobs.map(job => ({
      ...job,
      companyLower: job.company?.toLowerCase().trim()
    }));
    
    // Group by normalized company name
    const grouped = {};
    normalizedJobs.forEach(job => {
      if (job.companyLower) {
        if (!grouped[job.companyLower]) grouped[job.companyLower] = [];
        grouped[job.companyLower].push({
          role: job.role,
          tier: job.tier || 'All Tiers'
        });
      }
    });
    
    window.jobRoles = grouped;
    console.log(`✅ CASE-INSENSITIVE groups: ${Object.keys(grouped).length} companies`);
    console.log('Sample:', Object.keys(grouped).slice(0,3));
  } catch (err) {
    console.error('Jobs load failed:', err);
    window.jobRoles = {};
  }
}

async function renderCompanies(companies) {
  console.log(`🎨 FULL DATA: ${companies.length} companies + JOBS matching`);
  
  companies.forEach(c => {
    const companyLower = c.name.toLowerCase().trim();
    const companyJobs = window.jobRoles[companyLower] || [];
    console.log(`  ✅ ${c.name} (lower:${companyLower}) → ${companyJobs.length} jobs`);
    
    c.jobRoles = companyJobs;
  });
  
  const loading = document.getElementById('loading');
  const grid = document.getElementById('companiesGrid');

  if (loading) loading.style.display = 'none';

  grid.innerHTML = companies.map(c => `
    <div class="company-detail-card">
      <h3>${c.name}</h3>
      <div class="tier-badge ${c.badgeClass || 't3'}">${c.badge || 'Open for All'}</div>
      <div class="bars" style="margin-top:14px;">
        <div class="bar-row"><span>T1</span><div class="bar-fill t1-fill" style="width:${c.t1 || 25}%"></div><span>${c.t1 || 25}%</span></div>
        <div class="bar-row"><span>T2</span><div class="bar-fill t2-fill" style="width:${c.t2 || 35}%"></div><span>${c.t2 || 35}%</span></div>
        <div class="bar-row"><span>T3</span><div class="bar-fill t3-fill" style="width:${c.t3 || 30}%"></div><span>${c.t3 || 30}%</span></div>
        <div class="bar-row"><span>T4</span><div class="bar-fill t4-fill" style="width:${c.t4 || 10}%"></div><span>${c.t4 || 10}%</span></div>
      </div>
      <div class="role-breakdown">
        <h4>Role-wise Breakdown:</h4>
${c.jobRoles?.length ? c.jobRoles.map(r => `
          <div class="role-row">
            <span>${r.role}</span>
            <span>${r.tier}</span>
          </div>
        `).join('') : `<p>No job listings for ${c.name} | Check Jobs page</p>`}
      </div>
    </div>
  `).join('');
}

async function handleFilter(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const companies = await window.api.fetchCompanies(type);
  renderCompanies(companies);
}

// Load on page ready
document.addEventListener('DOMContentLoaded', async () => {
  await loadJobRoles(); // Load jobs first
  // Initial load
  await handleFilter('all', document.querySelector('.filter-btn.active'));
});
