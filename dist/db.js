"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("./config/config");
const pool = new pg_1.Pool({
    user: config_1.config.db.user,
    password: config_1.config.db.password,
    host: config_1.config.db.host,
    port: config_1.config.db.port,
    database: config_1.config.db.name,
});
exports.default = pool;
//# sourceMappingURL=db.js.map