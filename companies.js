function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

async function renderCompanies(companies) {
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
        ${c.roles?.map(r => `
          <div class="role-row">
            <span>${r.role}</span>
            <span>${r.tier}</span>
          </div>
        `).join('') || '<p>No roles data</p>'}
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
  // Initial load
  await handleFilter('all', document.querySelector('.filter-btn.active'));
});
