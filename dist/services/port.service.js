"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPortRules = addPortRules;
exports.deletePortRules = deletePortRules;
const ruleOperations_1 = require("../utils/ruleOperations");
const port_validator_1 = require("../validators/port.validator");
const errors_1 = require("../utils/errors");
async function addPortRules(values, mode) {
    if (!values.every(port_validator_1.isValidPort)) {
        throw new errors_1.BadRequestError('Invalid port number');
    }
    return (0, ruleOperations_1.addRulesToTable)('port_rules', values, mode);
}
function deletePortRules(values, mode) {
    return (0, ruleOperations_1.deleteRulesFromTable)('port_rules', values, mode);
}
//# sourceMappingURL=port.service.js.map