import {pool} from '../db';

type RuleMode = 'blacklist' | 'whitelist';

export async function addRulesToTable<T extends string | number>(
  tableName: string,
  values: T[],
  mode: RuleMode
): Promise<{ id: number; value: T; mode: RuleMode; active: boolean }[]> 
{
  const client = await pool.connect();
  try {
    const inserted: { id: number; value: T; mode: RuleMode; active: boolean }[] = [];

    for (const value of values) {
      const result = await client.query(
        `INSERT INTO ${tableName} (value, mode)
         VALUES ($1, $2)
         RETURNING id, value, mode, active`,
        [value, mode]
      );
      inserted.push(result.rows[0]);
    }

    return inserted;
  } catch (err) {
    console.error(`Error inserting rules on ${tableName}:`, err);
    throw err;
  } finally {
    client.release();
  }
}

export async function deleteRulesFromTable<T extends string | number>(
  tableName: string,
  values: T[],
  mode: RuleMode
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const deletedValues: T[] = [];

    for (const value of values) {
      const result = await client.query(
        `DELETE FROM ${tableName} WHERE value = $1 AND mode = $2 RETURNING value`,
        [value, mode]
      );

      if ((result.rowCount || 0) > 0) {
        deletedValues.push(value);
      }
    }

    return deletedValues;
  } catch (err) {
    console.error(`Error deleting rules from ${tableName}:`, err);
    throw err;
  } finally {
    client.release();
  }
}
