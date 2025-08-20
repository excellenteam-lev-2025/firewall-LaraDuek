import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { seedMockData } from '../scripts/mock_data_population';

export default async function globalSetup() {
  const flagPath = join(process.cwd(), '.seed.done');
  if (existsSync(flagPath)) return;

  await seedMockData(); 
  writeFileSync(flagPath, 'ok');
}
