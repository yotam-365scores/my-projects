
import { BehaviorSubject, combineLatest } from "rxjs";
import { initIndex } from "../common";
import { map } from "rxjs/operators";

import { Person } from "./person";

export const [reCalc, indexObserver] = initIndex(0);

export const Store = {
    Person
};

setInterval(() => {
    reCalc();
}, 1000);

