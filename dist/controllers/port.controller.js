"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeletePortRules = exports.handleAddPortRules = void 0;
const ruleHandlers_1 = require("../utils/ruleHandlers");
const port_service_1 = require("../services/port.service");
exports.handleAddPortRules = (0, ruleHandlers_1.createAddHandler)('port', port_service_1.addPortRules);
exports.handleDeletePortRules = (0, ruleHandlers_1.createDeleteHandler)('port', port_service_1.deletePortRules);
//# sourceMappingURL=port.controller.js.map