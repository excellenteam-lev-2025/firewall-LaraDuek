"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = require("./src/config/env");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: 'postgresql',
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    dbCredentials: { url: env_1.config.databaseUri },
    verbose: true,
    strict: true,
});
//# sourceMappingURL=drizzle.config.js.map