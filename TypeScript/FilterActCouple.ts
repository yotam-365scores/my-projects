import { Action, Func, Predicate } from "./common";
import { ForeachData } from "./ForeachData";

export class FilterActCouple<Typ>
{

    /**
     *
     */
     constructor(parameters: Partial<FilterActCouple<Typ>>) {
        //super();
        Object.assign(this, parameters);        
    }

    /* #region static Region */    
    static onException: Func<Error, Error>;

    static initCouple<Typ>(isDo: Predicate<ForeachData<Typ>>, actionToDo: Action<ForeachData<Typ>>): FilterActCouple<Typ>
    {
        return new FilterActCouple<Typ>({ isDo, actionToDo });
    }

    /* #endregion */    
    
    
    isDo: Predicate<ForeachData<Typ>>;
    actionToDo: Action<ForeachData<Typ>>;

    run(Item: ForeachData<Typ>): FilterActCouple<Typ>
    {
        try
        {
            if (this.isDo != undefined && this.actionToDo != undefined)
            {
                var isDo = this.isDo(Item);
                if (isDo)
                {
                    this.actionToDo(Item);
                }
            }
        }
        catch (error)
        {
            if (FilterActCouple.onException != undefined)
            {
                var ex = FilterActCouple.onException(error);
                if (ex != null)
                {
                    throw ex;
                }
            }
        }
        return this;
    }
}

export class ArrayFilter<Typ> extends Array<FilterActCouple<Typ>> {
    // constructor by Partial
    static initList<Typ>(parameters: Partial<ArrayFilter<Typ>> = undefined): ArrayFilter<Typ>
    {
        return Object.assign(new ArrayFilter<Typ>(), parameters);
    }

    // Array constructor
    //constructor(parameters: any = undefined) { super(parameters); }    
    
    RunFilterAct(data: ForeachData<Typ>): ForeachData<Typ> {
        this.forEach((filterActItem: FilterActCouple<Typ>) =>
        {
            filterActItem.run(data);
        });
        return data;
    }

}
