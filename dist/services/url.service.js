"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUrlRules = addUrlRules;
exports.deleteUrlRules = deleteUrlRules;
const ruleOperations_1 = require("../utils/ruleOperations");
const url_validator_1 = require("../validators/url.validator");
const errors_1 = require("../utils/errors");
function addUrlRules(values, mode) {
    if (!values.every(url_validator_1.isValidUrl)) {
        throw new errors_1.BadRequestError('Invalid URL format');
    }
    return (0, ruleOperations_1.addRulesToTable)('url_rules', values, mode);
}
function deleteUrlRules(values, mode) {
    return (0, ruleOperations_1.deleteRulesFromTable)('url_rules', values, mode);
}
//# sourceMappingURL=url.service.js.map