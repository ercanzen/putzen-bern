import fs from 'fs';
import https from 'https';
const file = fs.createWriteStream('design.html');
https.get('https://api.anthropic.com/v1/design/h/b8NcBws4FB5tYRDcVLVCgg?open_file=Aethera+Hero.html', (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => console.log('Download completed.'));
  });
}).on('error', (err) => {
  fs.unlink('design.html', () => {});
  console.error('Error downloading:', err.message);
});
