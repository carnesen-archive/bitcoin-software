// example.js
const { install } = require('.');
const { homedir } = require('os');
const runAndExit = require('@carnesen/run-and-exit');

runAndExit(async () => {
  console.log('Installing Bitcoin Core ...')
  const { changed, dir } = await install({
    implementation: 'core',
    version: '0.17.1',
    destination: homedir(),
  });
  const message = changed 
    ? `Installed Bitcoin Core to ${dir}`
    : `Bitcoin Core is already installed at ${dir}`;
  console.log(message);
});
