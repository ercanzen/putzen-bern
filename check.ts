import fs from 'fs';
const buf = fs.readFileSync('design_unzipped.html');
console.log(buf.slice(0, 1000).toString('utf8'));
