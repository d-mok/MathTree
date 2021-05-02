define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Blood extends Error {
        constructor(name, message) {
            super(message);
            this.name = name + 'Error';
        }
    }
    globalThis.Blood = Blood;
});
