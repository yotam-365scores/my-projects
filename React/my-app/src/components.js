import { useState } from "react";
import { useBehaviorSubject } from "./common";
//import { BehaviorSubject } from "rxjs";

export const default_onChange = (innerValue, text) => {};
export const defaultBase = { text: "", initialState: undefined, onChange: undefined, isDisabled: false };


// Base for components
export const GetBase = ({ text = "", initialState = undefined, onChange = undefined, isDisabled = false }) =>{
  const [value, nextValue] = useState(initialState);
  const [disabled, setDisabled] = useState(isDisabled);

  var events = {};
  if (onChange && onChange !== undefined) {
    events.onChange = onChange;
  }

  console.log("GetInput: ", { value, nextValue, text, initialState, disabled });

  return { value, nextValue, events, text, setDisabled, isDisabled: disabled };

}

export const GetInput = (param = defaultBase) => {  
  /*
  const behaviorSubject = new BehaviorSubject(initialState);
  const [value, nextValue, subscribe, subscription, subscribable] =
    useBehaviorSubject(behaviorSubject); */

  //const base = GetBase({...param, isDisabled: true});
  const base = GetBase(param);

  const handleInputChange = (event) => {
    try {
      event.preventDefault();
      const innerValue = event.target.value;
      console.log("handleChange value: ", innerValue);
      base.nextValue(innerValue);
      if (base.events && base.events.onChange) {
        base.events.onChange(innerValue, base.text);
      }
    } catch (error) {
      console.error("handleChange error: ", error);
    }
  };

  try {
    const html = (
      <input type="text" disabled={base.isDisabled} value={base.value} onChange={handleInputChange} />
    );

    console.log("GetInput: ", { ...base, html });

    return { ...base, html };
  } catch (error) {
    console.error("handleSubmit ", error);
  }
};

export const GetTextarea = (param = defaultBase) => {
  /* 
  const behaviorSubject = new BehaviorSubject(initialState);
  const [value, nextValue, subscribe, subscription, subscribable] =
    useBehaviorSubject(behaviorSubject); */

  const base = GetBase(param);

  try {
    const handleInputChange = (event) => {
      try {
        event.preventDefault();
        const innerValue = event.target.value;
        console.log("handleChange value: ", innerValue);
        base.nextValue(innerValue);
        if (base.events && base.events.onChange) {
          base.events.onChange(innerValue, base.text);
        }
      } catch (error) {
        console.error("handleChange error: ", error);
      }
    };
    const html = (
      <textarea value={base.value} disabled={base.isDisabled} onChange={handleInputChange} />
    );

    console.log("GetInput: ", { ...base, html });

    return { ...base, html };
  } catch (error) {
    console.error("handleSubmit ", error);
  }
};

export const GetButton = (param = defaultBase) => {
  /* 
  const behaviorSubject = new BehaviorSubject(initialState);
  const [value, nextValue, subscribe, subscription, subscribable] =
    useBehaviorSubject(behaviorSubject); */

  const base = GetBase(param);

  try {
    const html = (
      <button
      type="button"
      onClick={() => {
        const val = !base.value;
        base.nextValue(val);
        console.log("handleChange value: ", val);

        if (base.events && base.events.onChange) {
          base.events.onChange(val, base.text);
        }

      }}
    >
      {base.text}
    </button>

    );

    console.log("GetInput: ", { ...base, html });

    return { ...base, html };
  } catch (error) {
    console.error("handleSubmit ", error);
  }
};
