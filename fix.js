const fs = require('fs');
const code = fs.readFileSync('data.js', 'utf8');
const colleges = [];
const regex = /\{\s*name:\s*"([^"]+)",\s*tier:\s*(\d)\s*\}/g;
let m;
while ((m = regex.exec(code)) !== null) {
  colleges.push({ name: m[1], tier: parseInt(m[2]) });
}
const unique = colleges.filter((c, i, arr) =>
  arr.findIndex(x => x.name.toLowerCase() === c.name.toLowerCase()) === i
);
console.log('raw:', colleges.length, 'unique:', unique.length);

// Build new data.js with only unique colleges
const lines = unique.map(c => `  { name: "${c.name}", tier: ${c.tier} },`).join('\n');
const rest = code.slice(code.indexOf('];\n\nconst tierInfo'));
const newContent = `const colleges = [\n${lines}\n];\n${rest.slice(rest.indexOf('\nconst tierInfo') + 1)}`;
fs.writeFileSync('data.js', newContent, 'utf8');
console.log('data.js updated with', unique.length, 'unique colleges');
