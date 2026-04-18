"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function excludeField(user, keys) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
exports.default = excludeField;
