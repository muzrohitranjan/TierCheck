const fs = require('fs');
const code = fs.readFileSync('data.js', 'utf8');
const existing = [];
const regex = /\{ name: "([^"]+)", tier: (\d) \}/g;
let m;
while ((m = regex.exec(code)) !== null) {
  existing.push(m[1].toLowerCase());
}
console.log('Existing total:', existing.length);
const blr = existing.filter(n => n.includes('bangalore') || n.includes('bengaluru'));
console.log('Bangalore colleges already:', blr.length);
