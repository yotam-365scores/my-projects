import { useState } from "react";
import { useBehaviorSubject } from "./common";
//import { BehaviorSubject } from "rxjs";

export const default_onChange = (innerValue, text) => {};

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

export const GetInput = ({ text = "", initialState = undefined, onChange = undefined, isDisabled = false }) => {
  const [value, nextValue] = useState(initialState);
  const [disabled, setDisabled] = useState(isDisabled);
  
  /* 
  const behaviorSubject = new BehaviorSubject(initialState);
  const [value, nextValue, subscribe, subscription, subscribable] =
    useBehaviorSubject(behaviorSubject); */
  try {

    var events = {};
    if (onChange && onChange !== undefined) {
      events.onChange = onChange;
    }

    //const input = GetInput({text: 'some Input', initialState: ''})
    const handleInputChange = (event) => {
      try {
        event.preventDefault();
        const innerValue = event.target.value;
        console.log("handleChange value: ", innerValue);
        nextValue(innerValue);
        if (events && events.onChange) {
          events.onChange(innerValue, text);
        }
      } catch (error) {
        console.error("handleChange error: ", error);
      }
    };
    const html = (
      <input type="text" disabled={disabled} value={value} onChange={handleInputChange} />
    );

    console.log("GetInput: ", { html, value, nextValue, text, initialState, disabled });

    return { html, value, nextValue, text, setDisabled, isDisabled: disabled };
  } catch (error) {
    console.error("handleSubmit ", error);
  }
};

export const GetTextarea = ({ text = "", initialState = undefined, onChange = undefined, isDisabled = false }) => {
  /* 
  const behaviorSubject = new BehaviorSubject(initialState);
  const [value, nextValue, subscribe, subscription, subscribable] =
    useBehaviorSubject(behaviorSubject); */
  try {
    const [value, nextValue] = useState(initialState);

    var events = {};
    if (onChange && onChange !== undefined) {
      events.onChange = onChange;
    }

    //const input = GetInput({text: 'some Input', initialState: ''})
    const handleInputChange = (event) => {
      try {
        event.preventDefault();
        const innerValue = event.target.value;
        console.log("handleChange value: ", innerValue);
        nextValue(innerValue);
        if (events && events.onChange) {
          events.onChange(innerValue, text);
        }
      } catch (error) {
        console.error("handleChange error: ", error);
      }
    };
    const html = (
      <textarea value={value} disabled={true} onChange={handleInputChange} />
    );

    console.log("GetInput: ", { html, value, nextValue, text, initialState });

    return { html, value, nextValue, text };
  } catch (error) {
    console.error("handleSubmit ", error);
  }
};

export const GetButton = ({ text = "", initialState = true, onClick = undefined }) => {
  /* 
  const behaviorSubject = new BehaviorSubject(initialState);
  const [value, nextValue, subscribe, subscription, subscribable] =
    useBehaviorSubject(behaviorSubject); */
  try {
    const [value, nextValue] = useState(initialState);

    var events = {};
    if (onClick && onClick !== undefined) {
      events.onClick = onClick;
    }

    //const input = GetInput({text: 'some Input', initialState: ''})
    const html = (
      <button
      type="button"
      onClick={() => {
        const val = !value;
        nextValue(val);
        console.log("handleChange value: ", val);

        if (events && events.onClick) {
          events.onClick(val, text);
        }

      }}
    >
      {text}
    </button>

    );

    console.log("GetInput: ", { html, value, nextValue, text, initialState });

    return { html, value, nextValue, text };
  } catch (error) {
    console.error("handleSubmit ", error);
  }
};
