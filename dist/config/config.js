"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: 5000,
    db: {
        user: 'lara',
        password: 'lara123',
        host: 'localhost',
        port: 5433,
        name: 'dbname',
    },
};
//# sourceMappingURL=config.js.map