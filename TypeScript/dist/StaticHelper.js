"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticHelper = exports.Done = exports.arrFromGenerator = exports.FilterAct = exports.Filter = exports.ForeachYield = exports.MapYield = exports.GetArr = exports.Inf = exports.GetGenerator = void 0;
const ForeachData_1 = require("./ForeachData");
function* GetGenerator(arr = []) {
    if (arr.length) {
        //var arr = new List<number> { };
        let booly = true;
        for (let Index = 0; Index < arr.length && booly; Index++) {
            //Console.WriteLine("in GetArr, Index:" + Index);
            const item = arr[Index];
            const inVal = yield item;
            booly = inVal == undefined || inVal;
            //arr.Add(Index);
        }
    }
    return arr;
}
exports.GetGenerator = GetGenerator;
function* Inf() {
    let index = 0;
    let booly = true;
    let arr = [];
    while (booly) {
        arr.push(index++);
        const inVal = (yield index);
        booly = inVal == undefined || inVal;
    }
    return arr;
}
exports.Inf = Inf;
function* GetArr(start, end) {
    let arr = [];
    let booly = true;
    for (let Index = start; Index < end && booly; Index++) {
        arr.push(Index);
        const inVal = yield Index;
        booly = inVal == undefined || inVal;
    }
    return arr;
}
exports.GetArr = GetArr;
/* #region Foreach-Map-Yield Region */
/// <summary>
/// actionToDo on InTyp and convert to OutTyp
/// </summary>
/// <typeparam name="InTyp">In item type</typeparam>
/// <typeparam name="OutTyp">Out item type</typeparam>
/// <param name="arr">list of InTyp items</param>
/// <param name="Pipe">convert from In item type to Out item type</param>
/// <returns>arr after items change, can get each item by yield</returns>
function MapYield(arr, Pipe) {
    return __asyncGenerator(this, arguments, function* MapYield_1() {
        /*
        return arr.Map((ForeachData = { Item, Index, Array }) =>
        {
            //Console.WriteLine("in Map, Item: {0};", Item);
            return Item;
        }); */
        var foreachData = ForeachData_1.ForeachData.HasArray(arr);
        for (let Index = 0; Index < arr.length; Index++) {
            const item = arr[Index];
            console.log('in index, iterator.next', item);
            yield yield __await(Pipe(foreachData.HasItem(item, Index)));
        }
    });
}
exports.MapYield = MapYield;
/// <summary>
/// actionToDo on Typ on main item
/// </summary>
/// <typeparam name="Typ">item type</typeparam>
/// <param name="arr">list of Typ items</param>
/// <param name="actionToDo">actionToDo on each item type</param>
/// <returns>arr after items actionToDo, can get each item by yield</returns>
function* ForeachYield(arr, actionToDo) {
    return MapYield(arr, (x => { actionToDo(x); return x.Item; }));
}
exports.ForeachYield = ForeachYield;
/* #endregion */
/* #region Filter Region */
function* Filter(arr, isShow) {
    var foreachData = ForeachData_1.ForeachData.HasArray(arr);
    for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        //Console.WriteLine("in Map, Index: {0};", Item);
        //yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
        if (isShow(foreachData.HasItem(item, index))) {
            //yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
            yield item;
        }
    }
}
exports.Filter = Filter;
function* FilterAct(arr, filterAct) {
    //const foreachData = ForeachData.HasArray(arr);
    return ForeachYield(arr, (Item) => {
        //Console.WriteLine("in FilterAct, Item: {0};", Item);
        filterAct.RunFilterAct(Item);
    });
}
exports.FilterAct = FilterAct;
/* #endregion */
function arrFromGenerator(generator) {
    const arr = [];
    const iterator = generator();
    //console.log('iterator.next', iterator.next().value)
    // good: will not print the unnecessary t.done.
    var iteratorResult = iterator.next();
    while (!iteratorResult.done) {
        arr.push(iteratorResult.value);
        console.log('iterator.next', iteratorResult);
        iteratorResult = iterator.next();
    }
    return arr;
}
exports.arrFromGenerator = arrFromGenerator;
function Done(generator) {
    arrFromGenerator(generator);
}
exports.Done = Done;
class StaticHelper {
    constructor(_arr) {
        this._arr = _arr;
        /* #region Foreach-Map-Yield Region */
        this.MapYield = (Pipe) => {
            MapYield(this.arr, Pipe);
            return this;
        };
        this.ForeachYield = (actionToDo) => {
            ForeachYield(this.arr, actionToDo);
            return this;
        };
        /* #region Filter Region */
        this.Filter = (isShow) => {
            Filter(this.arr, isShow);
            return this;
        };
        this.FilterAct = (filterAct) => {
            FilterAct(this.arr, filterAct);
            return this;
        };
    }
    get arr() {
        if (this._arr != undefined) {
            return this._arr;
        }
        else {
            return arrFromGenerator(() => this._arr);
        }
    }
}
exports.StaticHelper = StaticHelper;
//# sourceMappingURL=StaticHelper.js.map