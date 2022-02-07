import { yieldRes } from "./StaticHelper";

export type myYieldRes<Typ> = yieldRes<Typ> | Typ[];

export class ForeachData<Typ>
{
    /**
     *
     */
    constructor(parameters: Partial<ForeachData<Typ>>) {
        //super();
        Object.assign(this, parameters);
    }

    static HasArray<Typ>(all: myYieldRes<Typ>): ForeachData<Typ> {
        return new ForeachData<Typ>({ all });
    }

    //static implicit operator Typ(ForeachData<Typ> foreachData) { return foreachData.Item; }
    //static explicit operator ForeachData<Typ>(Typ Item) { return new ForeachData<Typ>() { Item = Item }; }

    Item: Typ;
    Index: number = -1;

    all: myYieldRes<Typ>;

    HasItem(Item: Typ = undefined, Index: number = -1): ForeachData<Typ> {
        if (!Item === undefined)
        {
            this.Item = Item;
        }
        if (Index !== (-1))
        {
            this.Index = Index;
        }
        return this;
    }

    toString(): string
    {
        return this.Item.toString();
    }

}

export class ArrayForeach<Typ> extends Array<ForeachData<Typ>> {
    //constructor(parameters) {  }

}
