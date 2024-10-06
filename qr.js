const fs = require('fs');
const path = require('path');

const resultFile = './concatenated_qr.jsonl';
fs.writeFileSync(resultFile, '');

function findAndConcatQRJSONL(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      findAndConcatQRJSONL(filePath);
    } else if (file === 'qr.jsonl') {
      concatQRJSONL(filePath);
    }
  });
}

function concatQRJSONL(filePath) {
  const data = fs.readFileSync(filePath, 'utf8').trim();
  const lines = data.split('\n').filter(line => line.trim() !== ''); // Filter empty lines

  const validLines = lines.filter(line => {
    try {
      JSON.parse(line);
      return true;
    } catch (error) {
      console.error(`Invalid JSON line in ${filePath}: ${line}`);
      return false;
    }
  });

  const concatenatedLines = validLines.join('\n'); // Concatenate with a newline separator
  fs.appendFileSync(resultFile, concatenatedLines + '\n'); // Add a newline at the end
}

const startingDirectory = './';

findAndConcatQRJSONL(startingDirectory);
fs.writeFileSync(resultFile, fs.readFileSync(resultFile, 'utf8').replace(/\n$/, ''));