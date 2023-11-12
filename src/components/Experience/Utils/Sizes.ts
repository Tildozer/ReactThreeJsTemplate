import { Props } from "@react-three/fiber";
import { EventEmitter } from ".";

export default class Sizes extends EventEmitter {
  public width: number;
  public height: number;
  public pixelRatio: number;

  setParams() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  constructor(
    canvas: React.ForwardRefExoticComponent<
      Props & React.RefAttributes<HTMLCanvasElement>
    >,
  ) {
    super();

    this.setParams();

    window.addEventListener("resize", () => {
      this.setParams();

      this.trigger("resize");
    });
  }
}
