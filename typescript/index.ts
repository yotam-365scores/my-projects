import { ArrayFilter, FilterActCouple } from "./FilterActCouple";
import { ForeachData } from "./ForeachData";
import { FilterAct, GetArr } from "./StaticHelper";
import * as t from "./t";

let message: string = 'Hello World';
console.log(message);

// Bootstrap Style Type
export type BootstrapStyleType = "primary" | "secondary" | "success" | "danger" | "warning" | "info";

// Class With Default Constructor
export class ClassWithDefaultCtor {
    name: string;
    constructor(params: Partial<ClassWithDefaultCtor>) {
        Object.assign(this, params);
    }
}

export const classWithDefaultCtor = new ClassWithDefaultCtor({ name: 'some n' });

export interface Action<Typ> {
    (data: Typ): void;
}

export interface Func<TypIn, TypOut> {
    (data: TypIn): TypOut;
}

export interface Predicate<TypIn> extends Func<TypIn, boolean> {
    //(data: TypIn): boolean;
}


// *****************************************
export function sleep(ms: number): Promise<unknown> {
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


const arrayFilter = ArrayFilter.initList<number>();
arrayFilter.push(FilterActCouple.initCouple(x => x.Item < 5, x => console.log('x < 5', x)));
arrayFilter.push(FilterActCouple.initCouple(x => x.Item > 3, x => console.log('x > 3', x)));
arrayFilter.push(FilterActCouple.initCouple(x => x.Item > 7, x => console.log('x > 7', x)));
arrayFilter.push(FilterActCouple.initCouple((x => {
    var length = (x.all as Array<number>).length - 5;
    return x.Item == length;
}), x => console.log('length', x)));


(async () => {

    const iterator = GetArr(0,9);
    //console.log('iterator.next', iterator.next().value)
    
    // best, need async scope
    for await (const index of iterator) {
        console.log('in index, iterator.next', index);
        arrayFilter.RunFilterAct(new ForeachData({Item: index, Index: index}));
    }
    
})()
.catch((rejectedReason: any) => console.error('catch rejected Reason', rejectedReason))
.then((onFulfilledValue: any) => console.log('then on Fulfilled Value', onFulfilledValue));
