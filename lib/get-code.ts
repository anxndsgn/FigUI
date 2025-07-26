import fs from 'node:fs/promises';
import path from 'node:path';
import { fixImport } from './utils';

export async function getCode(src: string) {
  const code = await fs.readFile(path.join(process.cwd(), src), 'utf-8');

  return fixImport(code);
}
