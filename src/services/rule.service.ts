import pool from '../db';

export async function getAllRules() {
  const client = await pool.connect();
  try {
    const [ipRes, urlRes, portRes] = await Promise.all([
      client.query('SELECT id, value, mode, active FROM ip_rules'),
      client.query('SELECT id, value, mode, active FROM url_rules'),
      client.query('SELECT id, value, mode, active FROM port_rules'),
    ]);

    return {
      ip: ipRes.rows,
      url: urlRes.rows,
      port: portRes.rows,
    };
  } catch (err) {
    console.error('Error fetching rules:', err);
    throw err;
  } finally {
    client.release();
  }
}


type ToggleParams = {
  ids: number[];
  mode: 'blacklist' | 'whitelist';
  active: boolean;
};

async function toggleActive(
tableName: string,
  params?: ToggleParams
): Promise<any[]> {
  if (!params || !params.ids?.length) return [];

  const client = await pool.connect();
  try {
    const results: any[] = [];

    for (const id of params.ids) {
      const query = `
        UPDATE ${tableName}
        SET active = $1
        WHERE id = $2 AND mode = $3
        RETURNING id, value, active
      `;
      const res = await client.query(query, [params.active, id, params.mode]);
      if (res.rows[0]) results.push(res.rows[0]);
    }

    return results;
  } catch (err) {
    console.error(`Error updating ${tableName} rules:`, err);
    throw err;
  } finally {
    client.release();
  }
}

export async function toggleMultipleRules(data: {
  ips?: ToggleParams;
  urls?: ToggleParams;
  ports?: ToggleParams;
}) {
  const [ipResults, urlResults, portResults] = await Promise.all([
    toggleActive('ip_rules', data.ips),
    toggleActive('url_rules', data.urls),
    toggleActive('port_rules', data.ports),
  ]);

  return [...ipResults, ...urlResults, ...portResults];
}
