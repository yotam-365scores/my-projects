import React, { useState } from "react";
/* import AutoComplete from '@components/autocomplete' */

export const ShowList = () => {
  const [suggestions] = useState([
    {
      title: "React.js",
    },
    {
      title: "Angular.js",
    },
    {
      title: "Javascript",
    },
    {
      title: "Vue.js",
    },
    {
      title: "HTML",
    },
    {
      title: "CSS",
    },
    {
      title: "SCSS",
    },
    {
      title: "PHP",
    },
    {
      title: "Laravel",
    },
  ]);

  /* return (
    <AutoComplete
      suggestions={suggestions}
      className='form-control'
      filterKey='title'
      suggestionLimit={4}
      placeholder="Type 'a'"
    />
  ); */

  const suggestionItems = suggestions.map((suggestion, index) => (
    // Only do this if items have no stable IDs
    <li key={index}>
      {index}- {suggestion.title}
    </li>
  ));

  return <ul>{suggestionItems}</ul>;
};
//export default ShowList;

export class NameForm extends React.Component {
  constructor(props = {value: ''}) {
    super(props);
    this.state = { value: props.value || "" };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

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
