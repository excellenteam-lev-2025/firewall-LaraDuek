// src/scripts/mock_data_population.ts
import { faker } from '@faker-js/faker';
import { Client } from 'pg';
import { config } from '../config/env';
import { RuleMode , RULE_MODES } from '../utils/constants';

const unique = <T>(arr: T[]) => Array.from(new Set(arr));
function pickOne<T>(arr: readonly T[]): T {
  const idx = Math.floor(Math.random() * arr.length);
  const v = arr[idx];
  if (v === undefined) throw new Error('Empty array in pickOne');
  return v;
}
const pickMode = (): RuleMode => pickOne(RULE_MODES);

// generate 10 valid IPs
function generateIPs(n = 10): { value: string; mode: RuleMode }[] {
  const base = Array.from({ length: n }, () => ({
    value: faker.internet.ip(),
    mode: pickMode(),
  }));
  const edges = [
    { value: '0.0.0.0', mode: 'blacklist' as const },
    { value: '255.255.255.255', mode: 'whitelist' as const },
    { value: '127.0.0.1', mode: 'blacklist' as const },
  ];
  const all = unique([...edges, ...base].map(x => `${x.value}|${x.mode}`))
    .slice(0, n)
    .map(s => {
      const [value, mode] = s.split('|') as [string, string];
      return { value, mode: mode as RuleMode };
    });
  return all;
}

// generate 10 valid urls
function generateURLs(n = 10): { value: string; mode: RuleMode }[] {
  const urls = Array.from({ length: n }, () => ({
    value: faker.internet.url(),
    mode: pickMode(),
  }));
  urls[0] = { value: 'http://example.com', mode: 'blacklist' };
  if (n > 1) urls[1] = { value: 'https://example.org/path?x=1', mode: 'whitelist' };
  return urls;
}

// generate 10 valid ports
function generatePorts(n = 10): { value: number; mode: RuleMode }[] {
  const common = [1, 22, 53, 80, 123, 143, 443, 8080, 27017, 65535];
  const shuffled = faker.helpers.shuffle(common);   
  return shuffled.slice(0, n).map(p => ({
    value: p,
    mode: pickMode(),
  }));
}

export async function seedMockData() {
  console.log('[seed] connecting to database...');
  const client = new Client({
    connectionString: (config as any).databaseUri || (config as any).DATABASE_URI,
  });

  await client.connect();

  try {
    await client.query('BEGIN');
    await client.query('TRUNCATE TABLE ip_rules, url_rules, port_rules RESTART IDENTITY');

    console.log('[seed] generating fake data...');
    const ipData = generateIPs(10);
    const urlData = generateURLs(10);
    const portData = generatePorts(10);

    console.log('[seed] inserting in ip_rules...');
    for (const { value, mode } of ipData) {
      await client.query('INSERT INTO ip_rules (value, mode) VALUES ($1, $2)', [value, mode]);
    }

    console.log('[seed] inserting in url_rules...');
    for (const { value, mode } of urlData) {
      await client.query('INSERT INTO url_rules (value, mode) VALUES ($1, $2)', [value, mode]);
    }

    console.log('[seed] inserting in port_rules...');
    for (const { value, mode } of portData) {
      await client.query('INSERT INTO port_rules (value, mode) VALUES ($1, $2)', [value, mode]);
    }

    await client.query('COMMIT');
    console.log('[seed] done');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[seed] failed', err);
    throw err;
  } finally {
    await client.end();
    console.log('[seed] connection closed');
  }
}

if (require.main === module) {
  seedMockData().catch(() => process.exit(1));
}
