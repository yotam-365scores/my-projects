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
exports.sleep = exports.classWithDefaultCtor = exports.ClassWithDefaultCtor = void 0;
const FilterActCouple_1 = require("./FilterActCouple");
const ForeachData_1 = require("./ForeachData");
const StaticHelper_1 = require("./StaticHelper");
let message = 'Hello World';
console.log(message);
// Class With Default Constructor
class ClassWithDefaultCtor {
    constructor(params) {
        Object.assign(this, params);
    }
}
exports.ClassWithDefaultCtor = ClassWithDefaultCtor;
exports.classWithDefaultCtor = new ClassWithDefaultCtor({ name: 'some n' });
// *****************************************
function sleep(ms) {
    /*
    (async function run() {
      console.log("d");
      await sleep(1000);
      console.log("dd");
    })()
      .catch((e) => console.error("catch: ", e))
      .then((e) => console.log("then: "));
       */
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
const arrayFilter = FilterActCouple_1.ArrayFilter.initList();
arrayFilter.push(FilterActCouple_1.FilterActCouple.initCouple(x => x.Item < 5, x => console.log('x < 5', x)));
arrayFilter.push(FilterActCouple_1.FilterActCouple.initCouple(x => x.Item > 3, x => console.log('x > 3', x)));
arrayFilter.push(FilterActCouple_1.FilterActCouple.initCouple(x => x.Item > 7, x => console.log('x > 7', x)));
arrayFilter.push(FilterActCouple_1.FilterActCouple.initCouple((x => {
    var length = x.all.length - 5;
    return x.Item == length;
}), x => console.log('length', x)));
(() => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const iterator = (0, StaticHelper_1.GetArr)(0, 9);
    try {
        //console.log('iterator.next', iterator.next().value)
        // best, need async scope
        for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), !iterator_1_1.done;) {
            const index = iterator_1_1.value;
            console.log('in index, iterator.next', index);
            arrayFilter.RunFilterAct(new ForeachData_1.ForeachData({ Item: index, Index: index }));
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
//# sourceMappingURL=index.js.map