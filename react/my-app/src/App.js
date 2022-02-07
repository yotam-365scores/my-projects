// ! this is an exclamation mark
// ? this is a question mark 
// * this is a highlight
// todo this is a todo

import logo from './logo.svg';
//import {ShowList, NameForm} from './test';
//import {StringBuilder} from './dynamic';
import {StringInterpolation} from './string-interpolation';

//import {RxTest} from './rxTest';
//import './Customize-bootstrap.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// require bootstrap js
//import bootstrap from 'bootstrap'
require('bootstrap');
// 

require('react-json-pretty/themes/monikai.css');


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <hr />
        <StringInterpolation  />
        <hr />
        {/* <RxTest  />
        <hr />
        <StringBuilder  />
        <hr />
        <NameForm  />
        <hr /> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
