"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_controller_1 = require("../controllers/url.controller");
const router = (0, express_1.Router)();
router.post('/url', url_controller_1.handleAddUrlRules);
router.delete('/url', url_controller_1.handleDeleteUrlRules);
exports.default = router;
//# sourceMappingURL=url.routes.js.map