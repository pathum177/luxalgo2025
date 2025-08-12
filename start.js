// start.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');
const { exec } = require('child_process');

const repoZipUrl = 'https://github.com/pathum177/contact/archive/refs/heads/main.zip';
const extractPath = path.join(__dirname, 'contact');

async function downloadZip(url, dest) {
  const writer = fs.createWriteStream(dest);
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function setupAndRun() {
  try {
    const zipFilePath = path.join(__dirname, 'contact.zip');

    // Check if already extracted
    if (!fs.existsSync(extractPath)) {
      console.log('Downloading repo ZIP...');
      await downloadZip(repoZipUrl, zipFilePath);

      console.log('Extracting ZIP...');
      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(__dirname, true);

      // Rename extracted folder (GitHub ZIP extracts to contact-main)
      if (fs.existsSync(path.join(__dirname, 'contact-main'))) {
        fs.renameSync(path.join(__dirname, 'contact-main'), extractPath);
      }

      fs.unlinkSync(zipFilePath);
      console.log('Extraction done.');
    } else {
      console.log('Repo folder already exists, skipping download.');
    }

    console.log('Starting bot...');
    const child = exec('node index.js', { cwd: extractPath });

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      console.log(`Bot process exited with code ${code}`);
    });

  } catch (e) {
    console.error('Setup failed:', e);
  }
}

setupAndRun();
