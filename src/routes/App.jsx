import React, { useState, Component } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Experience from "../components/Experince";

class App extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  render() {
    return (
      <>
        <div className=" bg-slate-700 text-xl text-white">
          <div className="flex justify-center items-center">
            <a className="p-4" href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} alt="Vite logo" />
            </a>
            <a className="p-4" href="https://react.dev" target="_blank">
              <img src={reactLogo} alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div>
            <p>
              Edit <code>src/routes/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p>Click on the Vite and React logos to learn more</p>
        </div>
        <Experience ref={this.ref} />
      </>
    );
  }
}

export default App;
