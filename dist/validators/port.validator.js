"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPort = isValidPort;
function isValidPort(port) {
    return Number.isInteger(port) && port >= 1 && port <= 65535;
}
//# sourceMappingURL=port.validator.js.map