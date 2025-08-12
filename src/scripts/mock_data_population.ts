// scripts/mock_data_population.ts
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { config } from '../config/env'; 
import { RuleMode, isRuleMode } from '../utils/constants';

if (config.env !== 'dev') {
  console.error('Abort: ENV must be "dev" to run mock population.');
  process.exit(1);
}

// Re-usa tu modelo de modo si lo tienes exportado. Si no, mínimo local:
//const RuleModeSchema = z.enum(['blacklist', 'whitelist']);
//type RuleMode = z.infer<typeof RuleModeSchema>;

// Validaciones mínimas para los payloads que enviamos a tus endpoints
const ValuesPayloadSchema = z.object({
  values: z.array(z.union([z.string(), z.number()])).nonempty(),
  //mode: RuleMode.isRuleMode
});

function unique<T>(arr: T[], toKey: (v: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const v of arr) {
    const k = toKey(v);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(v);
    }
  }
  return out;
}

function genIps(n: number): string[] {
  const list: string[] = [];
  const edges = ['1.1.1.1', '8.8.8.8', '9.9.9.9', '123.123.123.123', '255.1.2.3'];
  list.push(...edges.slice(0, Math.min(edges.length, n)));
  while (list.length < n) list.push(faker.internet.ip());
  return unique(list, v => v).slice(0, n);
}

function genDomains(n: number): string[] {
  const list: string[] = [];
  const edges = ['example.com', 'sub.domain.org', 'my-site.net', 'test.co.il', 'service.io'];
  list.push(...edges.slice(0, Math.min(edges.length, n)));
  while (list.length < n) list.push(faker.internet.domainName());
  return unique(list.map(d => d.toLowerCase()), v => v).slice(0, n);
}

function genPorts(n: number): number[] {
  const edges = [1, 22, 80, 443, 1024, 3306, 5432, 6379, 8080, 65535];
  if (n <= edges.length) return edges.slice(0, n);
  const set = new Set(edges);
  while (set.size < n) {
    const p = Math.floor(1 + Math.random() * 65535);
    set.add(p);
  }
  return Array.from(set).slice(0, n);
}

function splitForModes<T>(values: T[]): { blacklist: T[]; whitelist: T[] } {
  const half = Math.floor(values.length / 2);
  return {
    blacklist: values.slice(0, half),
    whitelist: values.slice(half)
  };
}

async function postValues(type: 'ip' | 'url' | 'port', values: (string | number)[], mode: RuleMode) {
  const body = ValuesPayloadSchema.parse({ values, mode });
  const res = await fetch(`${config.databaseUri}/${type}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST /${type} ${mode} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function getAllRules() {
  const res = await fetch(`${config.databaseUri}/rules`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET /rules failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function updateActivation(payload: {
  urls?: { ids: number[]; mode: RuleMode; active: boolean };
  ports?: { ids: number[]; mode: RuleMode; active: boolean };
  ips?: { ids: number[]; mode: RuleMode; active: boolean };
}) {
  const res = await fetch(`${config.databaseUri}/rules`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT /rules failed: ${res.status} ${text}`);
  }
  return res.json();
}

// --------------- Main -----------------
(async () => {
  try {
    console.log('Mock population started (dev only)');

    // Generar 10 válidos por tabla
    const ips10 = genIps(10);
    const urls10 = genDomains(10);
    const ports10 = genPorts(10);

    const ips = splitForModes(ips10);
    const urls = splitForModes(urls10);
    const ports = splitForModes(ports10);

    await postValues('ip', ips.blacklist, 'blacklist');
    await postValues('ip', ips.whitelist, 'whitelist');

    await postValues('url', urls.blacklist, 'blacklist');
    await postValues('url', urls.whitelist, 'whitelist');

    await postValues('port', ports.blacklist, 'blacklist');
    await postValues('port', ports.whitelist, 'whitelist');

    console.log('Inserted: 10 IPs, 10 URLs, 10 ports (5/5 por modo)');

    const all = await getAllRules();
    const takeIds = (arr: Array<{ id: number }>, n = 2) => (Array.isArray(arr) ? arr.slice(0, n).map(x => x.id) : []);

    const payload: any = {};

    const ipBLids = takeIds(all.ips?.blacklist ?? []);
    if (ipBLids.length) payload.ips = { ids: ipBLids, mode: 'blacklist', active: false };

    const urlBLids = takeIds(all.urls?.blacklist ?? []);
    if (urlBLids.length) payload.urls = { ids: urlBLids, mode: 'blacklist', active: false };

    const portWLids = takeIds(all.ports?.whitelist ?? []);
    if (portWLids.length) payload.ports = { ids: portWLids, mode: 'whitelist', active: false };

    if (Object.keys(payload).length) {
      const upd = await updateActivation(payload);
      console.log('Toggled activation (edge-case coverage):', upd);
    } else {
      console.log('No items found to toggle activation (skipped).');
    }

    console.log('Mock population finished.');
  } catch (err: any) {
    console.error('Mock population failed:', err?.message ?? err);
    process.exit(1);
  }
})();
