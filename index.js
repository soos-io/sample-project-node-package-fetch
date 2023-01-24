#!/usr/bin/env node

import readline from 'readline';
import fetch from 'node-fetch';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = prompt => {
  return new Promise((resolve, reject) => {
    rl.question(prompt, resolve)
  });
}

const fetchIt = (packageManger, packageId) => {
  fetch(`https://api-stats.soos.io/api/package-managers/${packageManger}/packages?packageId=${packageId}`)
    .then((response) => response.text())
    .then((body) => {
        console.log(body);
    }).catch((error) => {
        console.error('error fetching', error);
    }); 
}

(async () => {
  const packageManager = await question('Which package manager? '); 
  const packageId = await question('Which package id? ');

  console.log(`Looking for ${packageManager} ${packageId}...`);

  fetchIt(packageManager, packageId);
  
  rl.close();
})();