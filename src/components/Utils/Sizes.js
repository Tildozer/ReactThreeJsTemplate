import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  setParams() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  constructor(canvas) {
    super();

    this.setParams();

    window.addEventListener("resize", () => {
      this.setParams();

      this.trigger("resize");
    });
  }
}
