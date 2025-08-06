"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = isValidUrl;
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=url.validator.js.map