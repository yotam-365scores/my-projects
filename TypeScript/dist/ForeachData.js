"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayForeach = exports.ForeachData = void 0;
class ForeachData {
    /**
     *
     */
    constructor(parameters) {
        this.Index = -1;
        //super();
        Object.assign(this, parameters);
    }
    static HasArray(all) {
        return new ForeachData({ all });
    }
    HasItem(Item = undefined, Index = -1) {
        if (!Item === undefined) {
            this.Item = Item;
        }
        if (Index !== (-1)) {
            this.Index = Index;
        }
        return this;
    }
    toString() {
        return this.Item.toString();
    }
}
exports.ForeachData = ForeachData;
class ArrayForeach extends Array {
}
exports.ArrayForeach = ArrayForeach;
//# sourceMappingURL=ForeachData.js.map