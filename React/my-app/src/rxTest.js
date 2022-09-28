import React from "react";
/* import AutoComplete from '@components/autocomplete' */

import { useBehaviorSubject, useBehaviorSubjectRef } from "./common";
import { GetInput } from "./components";
import { Store } from "./store/store";
const { Person } = Store;
const { data, calced } = Person;

export class NameForm extends React.Component {
  constructor(props = { value: "" }) {
    super(props);
    this.state = { value: props.value || "" };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>value: {this.state.value}</div>

        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

/*** Main Component ***/
export const defaultProps = {
  //initData: {}
};

//const {initData} = props;

export const RxTest = (_props = defaultProps) => {
  const pageTitle = RxTest.name;
  const props = Object.assign(defaultProps, _props);

  // rxjs section
  const [firstValue, nextFirst] = useBehaviorSubjectRef(data.first);
  const [lastValue] = useBehaviorSubject(data.last);
  const [fullName] = useBehaviorSubject(calced.fullName);

  // input section
  const input = GetInput({ text: "GetInput func" });

  const handleSubmit = (event) => {
    try {
      console.log("A name was submitted: ", firstValue);
      event.preventDefault();
    } catch (error) {
      console.error("handleSubmit error", error);
    }
  };

  const handleChange = (event) => {
    try {
      event.preventDefault();
      const innerValue = event.target.value;
      console.log("handleChange value: ", innerValue);
      //data.first.next(innerValue);
      nextFirst(innerValue);
    } 
    
    catch (error) {
      console.error("handleChange error: ", error);
    }
  };

  return (
    <React.Fragment>
      <h3>{pageTitle}</h3>
      <section>
        <legend>rxjs section</legend>
        <form onSubmit={handleSubmit}>
          <div>value: {firstValue.current}</div>
          <div>fullName: {fullName}</div>

          <label>
            Name:
            <input type="text" value={firstValue.current} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>

      <hr />
      <section>
        <legend>input section</legend>
        <div>
          input.html: {input.html} - {input.value}
        </div>
        <button
          type="button"
          onClick={() => {
            input.nextValue(input.value + 3);
          }}
        >
          nextValue
        </button>
      </section>

    </React.Fragment>
  );

};
