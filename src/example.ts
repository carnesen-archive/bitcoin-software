// example.ts
import { install } from '.';
import { homedir } from 'os';
import { runAndExit } from '@carnesen/run-and-exit';

runAndExit(async () => {
  console.log('Installing Bitcoin Core ...');
  const { changed, bitcoinHome } = await install({
    implementation: 'core',
    version: '0.17.1',
    destination: homedir(),
  });
  const message = changed
    ? `Installed Bitcoin Core to ${bitcoinHome}`
    : `Bitcoin Core is already installed at ${bitcoinHome}`;
  console.log(message);
});
