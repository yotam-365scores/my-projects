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
(function () {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        function* fetchNumbers() {
            const arr = [0, 1, 25, 3, 4];
            //const arr1 = [0, 1];
            // return items in next
            yield* arr;
            // will finish the first yield then go to next yield
            //yield* arr1;
            // retern full array
            //const res = yield arr;
            // wll be run only whan yield* arr is over, in iterator.next() after last item.
            console.log('finish yield');
        }
        // best.
        const iterator = fetchNumbers();
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
    });
})();
/* iterator.next()
// {value: 0, done: false}
iterator.next()
// {value: 1, done: false}
iterator.next()
// {value: 25, done: false}
iterator.next()
// {value: 3, done: false}
iterator.next()
// {value: 4, done: false}
iterator.next()
// finish yield
// {value: undefined, done: true} */
//# sourceMappingURL=yield.js.map