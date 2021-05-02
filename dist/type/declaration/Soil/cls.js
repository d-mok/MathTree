define(["require", "exports", "./tool/html"], function (require, exports, html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dict = exports.Config = void 0;
    class Config {
        constructor(sections = [], answer = "A", options = {}) {
            this.sections = sections;
            this.answer = answer;
            this.options = options;
        }
    }
    exports.Config = Config;
    class Dict {
        constructor(a = Symbol(), b = Symbol(), c = Symbol(), d = Symbol(), e = Symbol(), f = Symbol(), g = Symbol(), h = Symbol(), i = Symbol(), j = Symbol(), k = Symbol(), l = Symbol(), m = Symbol(), n = Symbol(), o = Symbol(), p = Symbol(), q = Symbol(), r = Symbol(), s = Symbol(), t = Symbol(), u = Symbol(), v = Symbol(), w = Symbol(), x = Symbol(), y = Symbol(), z = Symbol(), A = Symbol(), B = Symbol(), C = Symbol(), D = Symbol(), E = Symbol(), F = Symbol(), G = Symbol(), H = Symbol(), I = Symbol(), J = Symbol(), K = Symbol(), L = Symbol(), M = Symbol(), N = Symbol(), O = Symbol(), P = Symbol(), Q = Symbol(), R = Symbol(), S = Symbol(), T = Symbol(), U = Symbol(), V = Symbol(), W = Symbol(), X = Symbol(), Y = Symbol(), Z = Symbol()) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
            this.f = f;
            this.g = g;
            this.h = h;
            this.i = i;
            this.j = j;
            this.k = k;
            this.l = l;
            this.m = m;
            this.n = n;
            this.o = o;
            this.p = p;
            this.q = q;
            this.r = r;
            this.s = s;
            this.t = t;
            this.u = u;
            this.v = v;
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
            this.A = A;
            this.B = B;
            this.C = C;
            this.D = D;
            this.E = E;
            this.F = F;
            this.G = G;
            this.H = H;
            this.I = I;
            this.J = J;
            this.K = K;
            this.L = L;
            this.M = M;
            this.N = N;
            this.O = O;
            this.P = P;
            this.Q = Q;
            this.R = R;
            this.S = S;
            this.T = T;
            this.U = U;
            this.V = V;
            this.W = W;
            this.X = X;
            this.Y = Y;
            this.Z = Z;
            this.variables = [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                'i', 'j', 'k', 'l', 'm', 'n', 'o',
                'p', 'q', 'r', 's', 't', 'u', 'v',
                'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O',
                'P', 'Q', 'R', 'S', 'T', 'U', 'V',
                'W', 'X', 'Y', 'Z'
            ];
        }
        update(other) {
            for (let key of this.variables) {
                if (key in other)
                    this[key] = other[key];
            }
        }
        // blur() {
        //     for (let key of this.variables) {
        //         this[key] = Blur(this[key])
        //     }
        // }
        checked() {
            for (let key of this.variables) {
                let v = this[key];
                if (v === undefined ||
                    // v === null ||
                    (typeof v === 'number' && !Number.isFinite(v)))
                    return false;
            }
            return true;
        }
        substitute(text) {
            for (let key of this.variables) {
                let num = this[key];
                if (typeof num === 'symbol')
                    continue;
                text = html_1.PrintVariable(text, key, num);
            }
            return text;
        }
    }
    exports.Dict = Dict;
});
