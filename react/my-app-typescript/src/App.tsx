import React from 'react';
import logo from './logo.svg';
import './App.css';

/* import { GentericGrid } from './GenericGrid_simple'; */

import { GentericGrid } from './GenericGrid_advance';

export interface TableItem {
  name: string;
  someNumber: number;
}
const table: TableItem[] = [
  { name: 'name', someNumber: 45 },
  { name: 'name2', someNumber: 450 }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        GentericGrid: <GentericGrid table={table} />
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
