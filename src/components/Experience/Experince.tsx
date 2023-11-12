import * as THREE from "three";
import { Canvas, Props } from "@react-three/fiber";
import { Component } from "react";
import { sources } from ".";
import { Sizes, Time, Resources, Debug } from "./Utils";

declare global {
  interface Window {
    experience: Experience;
  }
}

let instance: Experience | null = null;

export default class Experience extends Component {
  public debug: Debug;
  public sizes: Sizes;
  public time: Time;
  public canvas: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLCanvasElement>
  >;
  public scene: THREE.Scene;
  public resources: Resources;

  resize() {}

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const vaule = child.material[key];
          if (vaule && typeof vaule.dispose === "function") {
            vaule.dispose();
          }
        }
      }

      // this.camera.controls.dispose();
      // this.renderer.intstance.dispose();

      if (this.debug.active) {
        this.debug.ui.destroy();
      }
    });
  }

  update() {
    // this.renderer.update();
    // this.world.update();
    // this.camera.update();
  }

  constructor() {
    if (instance) return instance;

    super({});
    instance = this;
    window.experience = this;

    //  Options
    // this.canvasRef = createRef();

    this.debug = new Debug();
    this.sizes = new Sizes(this.canvas);
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    // this.camera = new
  }

  componentDidMount() {
    // console.log(this.canvasRef.current);
  }

  render() {
    return <Canvas className="bg-black" children={undefined}></Canvas>;
  }
}
