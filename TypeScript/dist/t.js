"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const StaticHelper_1 = require("./StaticHelper");
function base() {
    class Base {
    }
    Base.prop = 'static prop in Base';
    return Base;
}
function derived() {
    class Derived extends base() {
    }
    return Derived;
}
class Spec extends derived() {
}
console.log('Spec.prop', Spec.prop);
(() => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const iterator = (0, StaticHelper_1.GetArr)(0, 12);
    try {
        //console.log('iterator.next', iterator.next().value)
        // best, need async scope
        for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), !iterator_1_1.done;) {
            const index = iterator_1_1.value;
            console.log('iterator.next', index);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return)) yield _a.call(iterator_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}))()
    .catch((rejectedReason) => console.error('catch rejected Reason', rejectedReason))
    .then((onFulfilledValue) => console.log('then on Fulfilled Value', onFulfilledValue));
//# sourceMappingURL=t.js.map