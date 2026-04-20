function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

let uniqueColleges = [];

async function liveSearch() {
  const input = document.getElementById('collegeInput').value.toLowerCase();
  const suggestionsBox = document.getElementById('suggestions');
  if (!input || input.length < 2) { 
    suggestionsBox.classList.add('hidden'); 
    return; 
  }
  uniqueColleges = await window.api.fetchColleges(input);
  const matches = uniqueColleges.slice(0, 6);
  if (matches.length === 0) { 
    suggestionsBox.classList.add('hidden'); 
    return; 
  }
  suggestionsBox.innerHTML = matches.map(c =>
    `<div data-name="${c.name.replace(/"/g, '"')}" onclick="selectCollege(this.dataset.name)">${c.name}</div>`
  ).join('');
  suggestionsBox.classList.remove('hidden');
}

function selectCollege(name) {
  document.getElementById('collegeInput').value = name;
  document.getElementById('suggestions').classList.add('hidden');
  searchCollege();
}

async function searchCollege() {
  const input = document.getElementById('collegeInput').value.trim();
  const resultBox = document.getElementById('tierResult');
  if (!input) return;
  uniqueColleges = await window.api.fetchColleges(input);
  const found = uniqueColleges.find(c => c.name.toLowerCase().includes(input.toLowerCase()));
  if (!found) {
    resultBox.className = 'tier-result tier3';
    resultBox.innerHTML = `<div class="college-name">College not found</div><div class="tier-desc">Try searching with a different name or check spelling.</div>`;
    resultBox.classList.remove('hidden');
    return;
  }
  const info = found.tierInfo || window.tierInfo[found.tier];
  resultBox.className = `tier-result ${info.color}`;
  resultBox.innerHTML = `
    <div class="college-name">${found.name}</div>
    <div class="tier-label">${info.label}</div>
    <div class="tier-desc">${info.desc}</div>
  `;
  resultBox.classList.remove('hidden');
}

// Allow Enter key
document.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('collegeInput');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') searchCollege(); });
  }
});
