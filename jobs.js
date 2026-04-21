function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function worthLabel(w) {
  if (w === 'yes') return `<span class="worth-badge worth-yes">✅ Worth Applying</span>`;
  if (w === 'no') return `<span class="worth-badge worth-no">❌ Likely Not Worth It</span>`;
  return `<span class="worth-badge worth-maybe">⚠️ Maybe — Check Role</span>`;
}

async function renderJobs(jobs) {
  const loading = document.getElementById('loading');
  const jobsList = document.getElementById('jobsList');

  if (loading) loading.style.display = 'none';

  jobsList.innerHTML = jobs.map(j => `
    <div class="job-card">
      <div class="job-info">
        <h3>${j.role} at ${j.company}</h3>
        <p>📍 ${j.location} &nbsp;|&nbsp; 🎯 Hiring Tier: <strong>${j.tier}</strong></p>
      </div>
      <div class="job-right">
        ${worthLabel(j.worth)}
        <button class="apply-btn">View Job</button>
      </div>
    </div>
  `).join('');
}

async function filterJobs(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const jobs = await window.api.fetchJobs(type);
  renderJobs(jobs);
}

// Load on page ready
document.addEventListener('DOMContentLoaded', async () => {
  await filterJobs('all', document.querySelector('.filter-btn.active'));
});
