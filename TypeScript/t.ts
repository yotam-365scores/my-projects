import { GetArr } from "./StaticHelper";

function base<Typ>() {
    class Base {
        //constructor(parameters) { }
        static prop1: Typ;
        static prop: string = 'static prop in Base';
    }
    return Base;
}

function derived<Typ>() {
    class Derived extends base<Typ>() {
        //constructor(parameters) { }
        static moreProp: Typ;
    }
    return Derived;
}

class Spec extends derived<number>() { }

console.log('Spec.prop', Spec.prop);


(async () => {
    const iterator = GetArr(0,12);
    //console.log('iterator.next', iterator.next().value)

    // best, need async scope
    for await (const index of iterator) {
        console.log('iterator.next', index);        
    }

})()
.catch((rejectedReason: any) => console.error('catch rejected Reason', rejectedReason))
.then((onFulfilledValue: any) => console.log('then on Fulfilled Value', onFulfilledValue));

