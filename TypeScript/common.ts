class name {
    constructor() {
        
    }
}

// Action, Predicate, Func
export interface Func<TypIn, TypOut> {
    (obj: TypIn): TypOut;
}

export interface Action<Typ> extends Func<Typ, void> {
    //(obj: Typ): void;
}

export interface Predicate<Typ> extends Func<Typ, boolean> {
    //(obj: Typ): boolean;
}

export type Constructor = new (...args: any[]) => {};

export type GConstructor<Typ = {}> = new (...args: any[]) => Typ;
