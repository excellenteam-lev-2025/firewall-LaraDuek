"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const ip_routes_1 = __importDefault(require("./routes/ip.routes"));
const url_routes_1 = __importDefault(require("./routes/url.routes"));
const port_routes_1 = __importDefault(require("./routes/port.routes"));
const rule_routes_1 = __importDefault(require("./routes/rule.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res, next) => {
    res.send('Hello, TypeScript with Express!');
});
app.use('/api/firewall', ip_routes_1.default);
app.use('/api/firewall', url_routes_1.default);
app.use('/api/firewall', port_routes_1.default);
app.use('/api/firewall', rule_routes_1.default);
app.listen(config_1.config.port, () => console.log('Server is running on port', config_1.config.port));
//# sourceMappingURL=app.js.map