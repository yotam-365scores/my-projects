import { Action, Func, Predicate } from "./common";
import { ArrayFilter } from "./FilterActCouple";
import { ForeachData, myYieldRes } from "./ForeachData";

// ItemTyp, void, nextVal
export type yieldRes<Typ> = Generator<Typ, Typ[], boolean>;

export function* GetGenerator<Typ>(arr: Typ[] = []): yieldRes<Typ> {
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

export function* Inf(): yieldRes<number> {
    let index = 0;
    let booly = true;
    let arr = [];
    while (booly) {
        arr.push(index++)
        const inVal = (yield index);
        booly = inVal == undefined || inVal;
    }
    return arr;
}

export function* GetArr(start: number, end: number): yieldRes<number> {
    let arr = [];
    let booly = true;
    for (let Index = start; Index < end && booly; Index++) {
        arr.push(Index)
        const inVal = yield Index;
        booly = inVal == undefined || inVal;
    }
    return arr;
}


/* #region Foreach-Map-Yield Region */

/// <summary>
/// actionToDo on InTyp and convert to OutTyp
/// </summary>
/// <typeparam name="InTyp">In item type</typeparam>
/// <typeparam name="OutTyp">Out item type</typeparam>
/// <param name="arr">list of InTyp items</param>
/// <param name="Pipe">convert from In item type to Out item type</param>
/// <returns>arr after items change, can get each item by yield</returns>
export async function* MapYield<InTyp, OutTyp>(arr: Array<InTyp>, Pipe: Func<ForeachData<InTyp>, OutTyp>) {
    /*			
    return arr.Map((ForeachData = { Item, Index, Array }) =>
    {
        //Console.WriteLine("in Map, Item: {0};", Item);
        return Item;
    }); */
    var foreachData = ForeachData.HasArray(arr);
    for (let Index = 0; Index < arr.length; Index++) {
        const item = arr[Index];
        console.log('in index, iterator.next', item);
        yield Pipe(foreachData.HasItem(item, Index));
    }

}


/// <summary>
/// actionToDo on Typ on main item
/// </summary>
/// <typeparam name="Typ">item type</typeparam>
/// <param name="arr">list of Typ items</param>
/// <param name="actionToDo">actionToDo on each item type</param>
/// <returns>arr after items actionToDo, can get each item by yield</returns>
export function* ForeachYield<Typ>(arr: Array<Typ>, actionToDo: Action<ForeachData<Typ>>) {
    return MapYield(arr,
        (x => { actionToDo(x); return x.Item; }));
}

/* #endregion */


/* #region Filter Region */

export function* Filter<Typ>(arr: Array<Typ>, isShow: Predicate<ForeachData<Typ>>) {
    var foreachData = ForeachData.HasArray(arr);
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


export function* FilterAct<Typ>(arr: Array<Typ>, filterAct: ArrayFilter<Typ>) {
    //const foreachData = ForeachData.HasArray(arr);
    return ForeachYield(arr, (Item) => {
        //Console.WriteLine("in FilterAct, Item: {0};", Item);
        filterAct.RunFilterAct(Item);
    });
}

/* #endregion */

export function arrFromGenerator<Typ>(generator: () => yieldRes<Typ>): Typ[] {
    const arr = [];
    const iterator = generator();
    //console.log('iterator.next', iterator.next().value)

    // good: will not print the unnecessary t.done.
    var iteratorResult = iterator.next();
    while (!iteratorResult.done) {
        arr.push(iteratorResult.value);
        console.log('iterator.next', iteratorResult)
        iteratorResult = iterator.next();
    }

    return arr;
}


export function Done<Typ>(generator: () => yieldRes<Typ>): void {
    arrFromGenerator(generator)
}

export class StaticHelper<Typ> {
    constructor(protected _arr: myYieldRes<Typ>) { }

    public get arr(): Array<Typ> {
        if (this._arr as (Array<Typ>) != undefined) {
            return this._arr as (Array<Typ>);
        }
        else {
            return arrFromGenerator(() => this._arr as (yieldRes<Typ>));
        }
    }

    /* #region Foreach-Map-Yield Region */
    MapYield = <OutTyp>(Pipe: Func<ForeachData<Typ>, OutTyp>) => {
        MapYield(this.arr, Pipe);
        return this;
    };

    ForeachYield = (actionToDo: Action<ForeachData<Typ>>) => {
        ForeachYield(this.arr, actionToDo);
        return this;
    };

    /* #region Filter Region */
    Filter = (isShow: Predicate<ForeachData<Typ>>) => {
        Filter(this.arr, isShow);
        return this;
    };

    FilterAct = (filterAct: ArrayFilter<Typ>) => {
        FilterAct(this.arr, filterAct);
        return this;
    };
}
