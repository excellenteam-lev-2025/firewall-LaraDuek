"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const port_controller_1 = require("../controllers/port.controller");
const router = (0, express_1.Router)();
router.post('/port', port_controller_1.handleAddPortRules);
router.delete('/port', port_controller_1.handleDeletePortRules);
exports.default = router;
//# sourceMappingURL=port.routes.js.map