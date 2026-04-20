function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

async function submitData(e) {
  e.preventDefault();
  
  const formData = {
    college: document.getElementById('s_college').value,
    tier: parseInt(document.getElementById('s_tier').value),
    company: document.getElementById('s_company').value,
    role: document.getElementById('s_role').value,
    year: parseInt(document.getElementById('s_year').value),
    type: document.getElementById('s_type').value
  };

  try {
    const result = await window.api.submitData(formData);
    document.getElementById('successMsg').classList.remove('hidden');
    document.querySelector('.submit-form').reset();
    setTimeout(() => {
      document.getElementById('successMsg').classList.add('hidden');
    }, 5000);
  } catch (err) {
    alert('Submission failed. Please try again.');
  }
}

// Load on page ready
document.addEventListener('DOMContentLoaded', () => {
  // Form ready
});
