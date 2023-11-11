import React, { Component, RefObject } from "react";
import "./index.css";

interface Props {}

class Main extends Component {
  public ref: RefObject<Component>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return <div className=" bg-slate-700 text-xl text-white"></div>;
  }
}

export default Main;
