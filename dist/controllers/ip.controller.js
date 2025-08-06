"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteIpRules = exports.handleAddIpRules = void 0;
const ruleHandlers_1 = require("../utils/ruleHandlers");
const ip_service_1 = require("../services/ip.service");
exports.handleAddIpRules = (0, ruleHandlers_1.createAddHandler)('ip', ip_service_1.addIpRules);
exports.handleDeleteIpRules = (0, ruleHandlers_1.createDeleteHandler)('ip', ip_service_1.deleteIpRules);
//# sourceMappingURL=ip.controller.js.map