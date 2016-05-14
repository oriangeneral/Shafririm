"use strict";
exports.times = function (i, cb, l) {
    if (l === void 0) { l = i; }
    if (i === 0) {
        return;
    }
    cb(l - i);
    exports.times(i - 1, cb, l);
};
