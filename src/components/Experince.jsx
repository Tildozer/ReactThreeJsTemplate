import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Component, createRef, } from 'react'
import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import mainSources from "./mainSources";

export default class Experience extends Component {
  resize() {}

  destroy() {}

  update() {}

  constructor(props) {
    super();
    // instance = this;
    //   window.experience = this;

    //  Options
    // this.canvasRef = createRef();

    this.debug = new Debug();
    this.sizes = new Sizes(this.canvas);
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(mainSources);
    //   this.camera = new
  }

  componentDidMount() {
    // console.log(this.canvasRef.current);
  }

  render() {
    return (
           <Canvas className="bg-black">
              {/* <canvas ref={this.canvasRef} /> */}
              {/* <mesh geometry={<boxGeometry />}/> */}
              
              <mesh>
                <boxGeometry></boxGeometry>
              </mesh>
          </Canvas>
          )
  }
}
