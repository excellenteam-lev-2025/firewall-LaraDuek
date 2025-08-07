"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRulesToTable = addRulesToTable;
exports.deleteRulesFromTable = deleteRulesFromTable;
const db_1 = __importDefault(require("../db"));
async function addRulesToTable(tableName, values, mode) {
    const client = await db_1.default.connect();
    try {
        const inserted = [];
        for (const value of values) {
            const result = await client.query(`INSERT INTO ${tableName} (value, mode)
         VALUES ($1, $2)
         RETURNING id, value, mode, active`, [value, mode]);
            inserted.push(result.rows[0]);
        }
        return inserted;
    }
    catch (err) {
        console.error(`Error inserting rules on ${tableName}:`, err);
        throw err;
    }
    finally {
        client.release();
    }
}
async function deleteRulesFromTable(tableName, values, mode) {
    const client = await db_1.default.connect();
    try {
        const deletedValues = [];
        for (const value of values) {
            const result = await client.query(`DELETE FROM ${tableName} WHERE value = $1 AND mode = $2 RETURNING value`, [value, mode]);
            if ((result.rowCount || 0) > 0) {
                deletedValues.push(value);
            }
        }
        return deletedValues;
    }
    catch (err) {
        console.error(`Error deleting rules from ${tableName}:`, err);
        throw err;
    }
    finally {
        client.release();
    }
}
//# sourceMappingURL=ruleOperations.js.map