import { BehaviorSubject, combineLatest } from "rxjs";
import { initIndex } from "../common";
import { map } from "rxjs/operators";

/* Data */
export const [reCalc, indexObserver] = initIndex(0);

export const first = new BehaviorSubject('first na')
export const last = new BehaviorSubject('las nam')

export const data = {
    indexObserver, first, last
}

/* Calced */
export const actions = {
    reCalc
};

const fullName = combineLatest({indexObserver, first, last})
    .pipe(
        map(({indexObserver: index, first, last}) => JSON.stringify({index, first, last}))
    );

fullName.subscribe(x => console.log('fullName', JSON.parse(x)));

export const calced = {
    fullName
};

export const Person = {
    data, actions, calced
};
