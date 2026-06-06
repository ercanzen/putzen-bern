import { execSync } from 'child_process';
import fs from 'fs';

console.log('Extracting tarball...');
execSync('tar xf design_unzipped.html');
console.log('Extracted things under putzen/:');
execSync('ls -lR putzen', { stdio: 'inherit' });
