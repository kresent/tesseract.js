#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { createWorker } = require('../../');

const [,, imagePath] = process.argv;
const image = path.resolve(__dirname, (imagePath || '../../tests/assets/images/cosmic.png'));

console.log(`Recognizing ${image}`);

(async () => {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text, pdf } } = await worker.recognize(image, {savePDF: true});
  console.log(text);
  fs.writeFileSync('tesseract-ocr-result.pdf', Buffer.from(pdf));
  console.log('Generate PDF: tesseract-ocr-result.pdf');
  await worker.terminate();
})();
