"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRules = getAllRules;
exports.toggleMultipleRules = toggleMultipleRules;
const db_1 = __importDefault(require("../db"));
async function getAllRules() {
    const client = await db_1.default.connect();
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
    }
    catch (err) {
        console.error('Error fetching rules:', err);
        throw err;
    }
    finally {
        client.release();
    }
}
async function toggleActive(tableName, params) {
    if (!params || !params.ids?.length)
        return [];
    const client = await db_1.default.connect();
    try {
        const results = [];
        for (const id of params.ids) {
            const query = `
        UPDATE ${tableName}
        SET active = $1
        WHERE id = $2 AND mode = $3
        RETURNING id, value, active
      `;
            const res = await client.query(query, [params.active, id, params.mode]);
            if (res.rows[0])
                results.push(res.rows[0]);
        }
        return results;
    }
    catch (err) {
        console.error(`Error updating ${tableName} rules:`, err);
        throw err;
    }
    finally {
        client.release();
    }
}
async function toggleMultipleRules(data) {
    const [ipResults, urlResults, portResults] = await Promise.all([
        toggleActive('ip_rules', data.ips),
        toggleActive('url_rules', data.urls),
        toggleActive('port_rules', data.ports),
    ]);
    return [...ipResults, ...urlResults, ...portResults];
}
//# sourceMappingURL=rule.service.js.map