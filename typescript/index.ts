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
