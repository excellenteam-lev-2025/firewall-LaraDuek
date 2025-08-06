"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteUrlRules = exports.handleAddUrlRules = void 0;
const ruleHandlers_1 = require("../utils/ruleHandlers");
const url_service_1 = require("../services/url.service");
exports.handleAddUrlRules = (0, ruleHandlers_1.createAddHandler)('url', url_service_1.addUrlRules);
exports.handleDeleteUrlRules = (0, ruleHandlers_1.createDeleteHandler)('url', url_service_1.deleteUrlRules);
//# sourceMappingURL=url.controller.js.map