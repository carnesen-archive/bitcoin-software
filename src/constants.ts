import { homedir } from 'os';
import { join } from 'path';

export const ROOT_DIR = join(homedir(), '.bitcoin-core');
export const DATA_DIR = join(ROOT_DIR, 'data');
export const DOWNLOADS_DIR = join(ROOT_DIR, 'downloads');
export const SOFTWARE_DIR = join(ROOT_DIR, 'software');

export const DEFAULT_VERSION = '0.17.1';
