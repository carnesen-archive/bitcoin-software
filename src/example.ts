// example.ts
import { installSoftware } from '.';
import { homedir } from 'os';

(async () => {
  console.log('Installing Bitcoin Core ...');
  const { changed, bitcoinHome } = await installSoftware({
    implementation: 'core',
    version: '0.17.1',
    destination: homedir(),
  });
  const message = changed
    ? `Installed Bitcoin Core to ${bitcoinHome}`
    : `Bitcoin Core is already installed at ${bitcoinHome}`;
  console.log(message);
})();
