import { useState } from "react";
import { BehaviorSubject, Subscriber } from "rxjs";

//create your view hook
export function useBehaviorSubject(
  subscribeable = new BehaviorSubject({}),
  initialState = undefined,
  isNext = true
) {
  //const [value, next] = useBehaviorSubject(new BehaviorSubject());

  const [value, _next] = useState(subscribeable.value); // state
  // subscribeable subscribe to pass to markup view
  subscribeable.subscribe((innerValue) => {
    try {
      _next(innerValue);
    } catch (error) {
      console.error("handleChange ", error);
    }
  });

  var returnArr = [value];

  if (isNext) {
    // export set opening, to send changes from markup view
    const next = (innerValue) => {
      try {
        subscribeable.next(innerValue);
      } catch (error) {
        console.error("handleChange ", error);
      }
    };
    returnArr.push(next);
  }

  return returnArr; // update the state to force render
}

function myLog(text = "") {
  // number of changes this subscriber has pass.
  var i = 0;
  return (val) => {
    console.log(i + ". " + text, val);
    i++;
  };
}

export function run() {
  const behaviorSubject = new BehaviorSubject([1]);
  // trigger ctor & next.
  behaviorSubject.subscribe(myLog("first subscribe, arr:"));

  behaviorSubject.next([0, ...behaviorSubject.value]);

  behaviorSubject.subscribe(myLog("second subscribe, arr:"));
  // trigger both
  behaviorSubject.next([...behaviorSubject.value, 2]);
}


export function RXJS() {
  // behaviorSubject
  const [value, next] = useBehaviorSubject(new BehaviorSubject(5));

  return (
    <div className="container">
      {value}
      <br />
      <button onClick={() => { next(value + 3); }} >Change</button>
    </div>
  );
}
