// React use wrapper

import React, { useState, useEffect, useRef } from "react";


export const useInterval = (callback, delay) => {
  /* // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  function Counter() {
  let [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
} */
  const savedCallback = useRef(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      //let id = setInterval(tick, delay); // origin
      let id = setInterval(savedCallback.current, delay); // test!, more efficient?
      return () => clearInterval(id);
    }
  }, [delay]);
}


function getStorageValue(key = "", defaultValue = undefined) {
  // getting stored value
  var initial;
  try {
    const saved = localStorage.getItem(key);
    initial = JSON.parse(saved);
  } 
  catch (error) {
    console.log("getStorageValue error", { error, key });
  }
  return initial || defaultValue;
}

function setStorageValue(key = "", newValue = undefined) {
  // setting stored value
  localStorage.setItem(key, JSON.stringify(newValue));
}

export const useLocalStorage1 = (key = "", defaultValue = undefined) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const GetLocalStorage = (key = "", defaultValue = undefined) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  // useEffect initialized & triggered when value changed.
  useEffect(() => {
    // storing input name
    setStorageValue(key, value);
  }, [key, value]);

  return [value, setValue];
};
