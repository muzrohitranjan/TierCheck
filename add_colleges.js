const fs = require('fs');
const code = fs.readFileSync('data.js', 'utf8');
const existing = [];
const regex = /\{ name: "([^"]+)", tier: (\d) \}/g;
let m;
while ((m = regex.exec(code)) !== null) {
  existing.push(m[1].toLowerCase());
}

const msec = existing.find(n => n.includes('m. s. engineering') || n.includes('ms engineering college'));
console.log('M. S. Engineering College found:', msec || 'NOT FOUND');

const newColleges = [
  { name: "M. S. Engineering College", tier: 3 },
  { name: "Jyothy Institute of Technology Bangalore", tier: 3 },
  { name: "New Horizon College of Engineering Bangalore", tier: 3 },
  { name: "Presidency University Bangalore", tier: 3 },
  { name: "CMR College of Engineering and Technology Bangalore", tier: 3 },
  { name: "Dayananda Sagar University Bangalore", tier: 3 },
  { name: "Reva University Bangalore", tier: 3 },
  { name: "Alliance University Bangalore", tier: 3 },
  { name: "Garden City University Bangalore", tier: 3 },
  { name: "Jain Deemed University Bangalore", tier: 3 },
  { name: "Kristu Jayanti College Bangalore", tier: 3 },
  { name: "St Joseph College of Engineering Bangalore", tier: 3 },
  { name: "Nitte Meenakshi Institute of Technology Bangalore", tier: 3 },
  { name: "BMS Institute of Technology and Management Bangalore", tier: 3 },
  { name: "RNS Institute of Technology Bangalore", tier: 3 },
  { name: "MVJ College of Engineering Bangalore", tier: 3 },
  { name: "East Point College of Engineering and Technology Bangalore", tier: 3 },
  { name: "Acharya Institute of Technology Bangalore", tier: 3 },
  { name: "Global Academy of Technology Bangalore", tier: 3 },
  { name: "Sir M Visvesvaraya Institute of Technology Bangalore", tier: 3 },
  { name: "Bangalore Institute of Technology Bangalore", tier: 3 },
  { name: "KNS Institute of Technology Bangalore", tier: 3 },
  { name: "Atria Institute of Technology Bangalore", tier: 3 },
  { name: "Cambridge Institute of Technology Bangalore", tier: 3 },
  { name: "Don Bosco Institute of Technology Bangalore", tier: 3 },
  { name: "Gopalan College of Engineering and Management Bangalore", tier: 3 },
  { name: "HKBK College of Engineering Bangalore", tier: 3 },
  { name: "Impact College of Engineering and Applied Sciences Bangalore", tier: 3 },
  { name: "Kammavari Sangham Institute of Technology Bangalore", tier: 3 },
  { name: "Nagarjuna College of Engineering and Technology Bangalore", tier: 3 },
  { name: "Sapthagiri College of Engineering Bangalore", tier: 3 },
  { name: "Brindavan College of Engineering Bangalore", tier: 3 },
  { name: "City Engineering College Bangalore", tier: 3 },
  { name: "Vemana Institute of Technology Bangalore", tier: 3 },
  { name: "Sri Krishna Institute of Technology Bangalore", tier: 3 },
  { name: "Srinidhi Institute of Science and Technology Bangalore", tier: 3 },
  { name: "Sambhram Institute of Technology Bangalore", tier: 3 },
  { name: "T John Institute of Technology Bangalore", tier: 3 },
  { name: "Sai Vidya Institute of Technology Bangalore", tier: 3 },
  { name: "Sri Sairam College of Engineering Bangalore", tier: 3 },
  { name: "Soundarya Institute of Management and Science Bangalore", tier: 3 },
  { name: "Dr Ambedkar Institute of Technology Bangalore", tier: 3 },
  { name: "Loka Shikshana Trust College of Engineering Bangalore", tier: 3 },
  { name: "Visvesvaraya College of Engineering Bangalore", tier: 3 },
  { name: "Vivekananda Institute of Technology Bangalore", tier: 3 },
  { name: "AMC Engineering College Bangalore", tier: 3 },
  { name: "Bangalore Technological Institute Bangalore", tier: 3 },
  { name: "Channabasaveshwara Institute of Technology Bangalore", tier: 3 },
  { name: "Ghousia College of Engineering Bangalore", tier: 3 },
  { name: "KS Institute of Technology Bangalore", tier: 3 },
  { name: "Rajarajeswari College of Engineering Bangalore", tier: 3 },
  { name: "Oxford College of Engineering Bangalore", tier: 3 },
  { name: "Shirdi Sai Engineering College Bangalore", tier: 3 },
  { name: "Silicon City College of Engineering Bangalore", tier: 3 },
  { name: "Sindhi Institute of Management Bangalore", tier: 3 },
  { name: "Sir MVIT Bangalore", tier: 3 },
  { name: "Seshadripuram College of Engineering Bangalore", tier: 3 },
  { name: "Presidency Institute of Engineering and Technology Bangalore", tier: 3 },
  { name: "Siddharth Institute of Engineering and Technology Bangalore", tier: 3 },
  { name: "Welingkar Institute of Management Development and Research Bangalore", tier: 3 },
  { name: "BMS Evening College of Engineering Bangalore", tier: 3 },
  { name: "Acharya and BM Reddy College of Engineering Bangalore", tier: 3 },
  { name: "Adichunchanagiri Institute of Technology Bangalore", tier: 3 },
  { name: "Aditya Institute of Technology and Management Bangalore", tier: 3 },
  { name: "AIT College of Engineering Bangalore", tier: 3 },
  { name: "Akshaya Institute of Technology Bangalore", tier: 3 },
  { name: "Alliance College of Engineering and Design Bangalore", tier: 3 },
  { name: "Alpha College of Engineering Bangalore", tier: 3 },
  { name: "Amruta Institute of Engineering and Management Sciences Bangalore", tier: 3 },
  { name: "Anekal College of Engineering Bangalore", tier: 3 },
  { name: "Anjuman Institute of Technology and Management Bangalore", tier: 3 },
  { name: "Atria College of Engineering Bangalore", tier: 3 },
  { name: "Aziz Sait Institute of Engineering and Technology Bangalore", tier: 3 },
  { name: "Bangalore College of Engineering and Technology Bangalore", tier: 3 },
  { name: "Bharath Institute of Engineering and Technology Bangalore", tier: 3 },
  { name: "Bhoomi College of Engineering Bangalore", tier: 3 },
  { name: "Canara Engineering College Bangalore", tier: 3 },
  { name: "Capital Institute of Technology Bangalore", tier: 3 },
  { name: "Cauvery Institute of Technology Bangalore", tier: 3 },
  { name: "Christ College of Engineering Bangalore", tier: 3 },
  { name: "CMR University Bangalore", tier: 3 },
  { name: "Dayananda Sagar Academy of Technology and Management Bangalore", tier: 3 },
  { name: "Deccan College of Engineering and Technology Bangalore", tier: 3 },
  { name: "Divya Jyothi College of Engineering and Technology Bangalore", tier: 3 },
  { name: "Dr CNS Institute of Technology Bangalore", tier: 3 },
  { name: "East West College of Engineering Bangalore", tier: 3 },
  { name: "Ekalavya Institute of Technology Bangalore", tier: 3 },
  { name: "Francis Xavier Engineering College Bangalore", tier: 3 },
  { name: "Ganga Institute of Technology and Management Bangalore", tier: 3 },
  { name: "Global Institute of Engineering and Technology Bangalore", tier: 3 },
  { name: "Gopalan Institute of Technology Bangalore", tier: 3 },
  { name: "Grace College of Engineering Bangalore", tier: 3 },
  { name: "Guru Nanak Institute of Technology Bangalore", tier: 3 },
  { name: "Hillside College of Engineering and Technology Bangalore", tier: 3 },
  { name: "Indira Gandhi Institute of Technology Bangalore", tier: 3 },
  { name: "Innovative Institute of Technology Bangalore", tier: 3 },
  { name: "International Institute of Engineering Bangalore", tier: 3 },
  { name: "Jain Institute of Technology Bangalore", tier: 3 },
  { name: "Janatha Shikshana Samithi Institute of Technology Bangalore", tier: 3 },
  { name: "Jawaharlal Nehru College of Engineering Bangalore", tier: 3 },
  { name: "Kalyani Institute of Technology and Engineering Bangalore", tier: 3 },
  { name: "Kengeri Institute of Technology Bangalore", tier: 3 },
];

// Filter out already existing
const toAdd = newColleges.filter(c => !existing.includes(c.name.toLowerCase()));
console.log('New colleges to add:', toAdd.length);

// Insert before the closing ];\n\nconst tierInfo
const insertPoint = code.indexOf('];\n\nconst tierInfo');
const newEntries = toAdd.map(c => `  { name: "${c.name}", tier: ${c.tier} },`).join('\n');
const newCode = code.slice(0, insertPoint) + '\n' + newEntries + '\n' + code.slice(insertPoint);
fs.writeFileSync('data.js', newCode, 'utf8');
console.log('Done! Added', toAdd.length, 'colleges');
