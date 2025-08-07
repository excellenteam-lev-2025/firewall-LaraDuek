"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidIp = isValidIp;
function isValidIp(ip) {
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    return ipv4Regex.test(ip);
}
//# sourceMappingURL=ip.validator.js.map