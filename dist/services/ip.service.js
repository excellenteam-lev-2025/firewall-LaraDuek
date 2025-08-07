"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIpRules = addIpRules;
exports.deleteIpRules = deleteIpRules;
const ruleOperations_1 = require("../utils/ruleOperations");
const ip_validator_1 = require("../validators/ip.validator");
const errors_1 = require("../utils/errors");
function addIpRules(values, mode) {
    if (!values.every(ip_validator_1.isValidIp)) {
        throw new errors_1.BadRequestError('Invalid IP address format');
    }
    return (0, ruleOperations_1.addRulesToTable)('ip_rules', values, mode);
}
function deleteIpRules(values, mode) {
    return (0, ruleOperations_1.deleteRulesFromTable)('ip_rules', values, mode);
}
//# sourceMappingURL=ip.service.js.map