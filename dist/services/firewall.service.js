"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRules = addRules;
const db_1 = __importDefault(require("../db"));
async function addRules(type, mode, values) {
    const client = await db_1.default.connect();
    try {
        const insertedRules = [];
        for (const value of values) {
            const result = await client.query(`
        INSERT INTO rules (type, mode, value)
        VALUES ($1, $2, $3)
        RETURNING id, type, mode, value, active
        `, [type, mode, String(value)]);
            insertedRules.push(result.rows[0]);
        }
        return insertedRules;
    }
    catch (err) {
        console.error('Error adding rules:', err);
        throw err;
    }
    finally {
        client.release();
    }
}
//# sourceMappingURL=firewall.service.js.map