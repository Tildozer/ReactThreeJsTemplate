import * as THREE from "three";
import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import mainSources from "./mainSources";

let instance = null;

export default class Experience {
  resize() {}

  destroy() {}

  update() {}

  constructor(canvas) {
    if (instance) {
      return instance;
    }

    instance = this;
    //   window.experience = this;

    //  Options
    this.canvas = canvas;

    this.debug = new Debug();
    this.sizes = new Sizes(this.canvas);
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(mainSources);
    //   this.camera = new
  }
}
