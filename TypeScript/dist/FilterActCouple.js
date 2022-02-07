"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayFilter = exports.FilterActCouple = void 0;
class FilterActCouple {
    /**
     *
     */
    constructor(parameters) {
        //super();
        Object.assign(this, parameters);
    }
    static initCouple(isDo, actionToDo) {
        return new FilterActCouple({ isDo, actionToDo });
    }
    run(Item) {
        try {
            if (this.isDo != undefined && this.actionToDo != undefined) {
                var isDo = this.isDo(Item);
                if (isDo) {
                    this.actionToDo(Item);
                }
            }
        }
        catch (error) {
            if (FilterActCouple.onException != undefined) {
                var ex = FilterActCouple.onException(error);
                if (ex != null) {
                    throw ex;
                }
            }
        }
        return this;
    }
}
exports.FilterActCouple = FilterActCouple;
class ArrayFilter extends Array {
    // constructor by Partial
    static initList(parameters = undefined) {
        return Object.assign(new ArrayFilter(), parameters);
    }
    // Array constructor
    //constructor(parameters: any = undefined) { super(parameters); }    
    RunFilterAct(data) {
        this.forEach((filterActItem) => {
            filterActItem.run(data);
        });
        return data;
    }
}
exports.ArrayFilter = ArrayFilter;
//# sourceMappingURL=FilterActCouple.js.map