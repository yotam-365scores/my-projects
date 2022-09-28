import { useState, useEffect, useRef, useLayoutEffect } from "react";

import { BehaviorSubject, Subject } from "rxjs";


//create your view hook
export const useBehaviorSubject = (subscribable = new BehaviorSubject()) => {
  /* const [value, next, subscribe, subscription, subscribable] = useBehaviorSubject(new BehaviorSubject()); */
  const [value, setValue] = useState(subscribable.value); // state

  useEffect(() => {
    // subscribeable subscribe to pass to markup view
    subscribable.subscribe((x) => setValue(x));
  }, [subscribable]);

  // export set opening, to send changes from markup view
  const next = subscribable.next?.bind(subscribable);

  const subscribe = subscribable.subscribe.bind(subscribable);

  //return [value, next, subscribe, subscription, subscribable];
  return [value, next, subscribe, subscribable];
};

export const useBehaviorSubjectRef = (subscribable = new BehaviorSubject()) => {
  /* 
  const [refObj, next, subscriptionCurrent] = useBehaviorSubjectRef(new BehaviorSubject());
  const val = refObj.current;
  next(newVal);
  */

  // export set opening, to send changes from markup view
  const next = subscribable.next?.bind(subscribable);

  const refObj = useRef(subscribable?.value); // state
  const subscriptionRef = useRef(null); // state

  const subscribeRef = (x) => refObj.current = (x);

  // useLayoutEffect?
  useEffect(() => {
    // subscribeable subscribe to pass to markup view
    subscriptionRef.current = subscribable.subscribe(subscribeRef);
    return () => { subscribable.unsubscribe(subscribeRef); }
  }, [subscribable]);

  //return [value, next];
  return [refObj, next, subscriptionRef.current];
};


//create your forceUpdate hook
export const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => {
    setValue((value) => value + 1);
    return value;
  }; // update the state to force render
};

export const initIndex = (index = 0) => {
  const _behaviorSubject = new BehaviorSubject(index);
  return [
    () => {
      const value = _behaviorSubject.value + 1;
      _behaviorSubject.next(value);
      return value;
    },
    _behaviorSubject,
  ];
};

const getJsonCircularReplacerHelper = () => {
  var ctrl = {};
  // Note: cache should not be re-used by repeated calls to JSON.stringify.
  var cache = [];
  ctrl.init = () => {
    cache = [];
  };

  ctrl.Replacer = (key, value) => {
    if (typeof value === "object" && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) return;

      // Store value in our collection
      cache.push(value);
    }

    return value;
  };

  ctrl.Dispose = (isInit = false) => {
    if (isInit) {
      ctrl.init();
    } 
    else {
      // Enable garbage collection
      cache = null; 
    }
  };

  return ctrl;
};

const replacerHelper = getJsonCircularReplacerHelper();

export const getJsonCircularReplacer = (obj = undefined) => {
  replacerHelper.init();

  // if has obj, stringify with Circular Replacer & Dispose the replacerHelper.
  if (obj !== undefined) {
    const str = JSON.stringify(obj, replacerHelper.Replacer);
    replacerHelper.Dispose();
    return str;
  }

  // no obj, return replacerHelper with ReplacerFunc and must be Disposed.
  return replacerHelper;
};
