// https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks

import React, { useEffect, useState } from "react";

// update state in setInterval
export function SetInterval(props = { init: 0, intervalMs: 1000 }) {
  /*   
  const [state, setState] = useState({ date: new Date() });
  const { index, clearInterval } = SetInterval();
  useEffect(() => {
    // Your code here
    setState({ date: new Date() });
    console.log("ClockFunc, setState");
    // update only whan 'index' is changed.
  }, [index]);
 */
  const { init, intervalMs } = props;
  const [index, setIndex] = useState(init || 0);
  const [interval, setIntervalTimer] = useState(undefined);

  useEffect(() => {
    // Your code here
    setIntervalTimer(
      setInterval(() => {
        setIndex((state) => state + 1);
      }, intervalMs || 1000)
    );
  }, []);

  const ClearInterval = () => {
    clearInterval(interval);
  };

  return { index, interval, clearInterval: ClearInterval };
}

class ClockClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };

  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidUpdate() { }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export function ClockFunc(props) {
  const [state, setState] = useState({ date: new Date() });
  
  const { index: intervalIndex, clearInterval } = SetInterval();
  
  /* setTimeout(() => {
    clearInterval();
  }, 3000); */


  // componentDidMount
  // Code inside componentDidMount run once when the component is mounted. useEffect hook equivalent for this behaviour
  // Notice the second parameter here (empty array). This will run only once.
  useEffect(() => {
    // Your code here
    console.log('useEffect componentDidMount');
  }, []);


  // componentDidUpdate
  // Without the second parameter the useEffect hook will be called on every render of the component which can be dangerous.
  useEffect(() => {
    // Your code here
    console.log('useEffect componentDidUpdate');
    setState({ date: new Date() });
    console.log("ClockFunc, setState");
    // update only whan 'intervalIndex' is changed.
  }, [intervalIndex]);
  // update continuously.
  //});


  // componentDidMount && componentWillUnmount
  // function will be called on component mount
  //
  useEffect(() => {
    console.log('useEffect componentDidMount');
    window.addEventListener("mousemove", () => {});

    // componentWillUnmount
    // returned function will be called on component unmount
    return () => {
      console.log('useEffect componentWillUnmount');
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <div>
      <br />
      <br />
      <h1>Hello, world! {intervalIndex}</h1>
      <h2>It is {state.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
