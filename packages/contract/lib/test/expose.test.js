var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { exposeIt, exposeAll } from '../src/index.js';
import { test, expect } from 'vitest';
export class Host {
    static log() {
        return 'hi';
    }
}
__decorate([
    exposeIt()
], Host, "log", null);
let Host2 = class Host2 {
    static log2() {
        return 'hihi';
    }
};
Host2 = __decorate([
    exposeAll()
], Host2);
export { Host2 };
test('expose', () => {
    expect(log()).toBe('hi');
});
test('exposeAll', () => {
    expect(log2()).toBe('hihi');
});
//# sourceMappingURL=expose.test.js.map