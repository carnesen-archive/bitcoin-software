// example.ts
import { installSoftware } from '.';
import { homedir } from 'os';
import { join } from 'path';

(async () => {
  console.log('Installing Bitcoin Core ...');
  const bitcoinHome = join(homedir(), `bitcoin-core-0.17.1`);
  const { changed } = await installSoftware(bitcoinHome);
  const message = changed
    ? `Installed Bitcoin Core to ${bitcoinHome}`
    : `Bitcoin Core is already installed at ${bitcoinHome}`;
  console.log(message);
})();
