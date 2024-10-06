const fs = require('fs');
const path = require('path');

function findAndConcatQRJSONL(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      findAndConcatQRJSONL(filePath);
    } else if (file.endsWith('qr.jsonl')) {
      concatQRJSONL(filePath);
    }
  });
}

function concatQRJSONL(filePath) {
  const data = fs.writeFileSync("concatenated_qr.jsonl", 'utf8');
}

const startingDirectory = './';
findAndConcatQRJSONL(startingDirectory);