import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  setLoaders() {
    this.loaders = {};

    this.loadingManger = new THREE.LoadingManager();
    this.loadingManger.onLoad = () => console.log("done loading.");
    this.loadingManger.onError = (url) =>
      console.error(
        `the assest URL ${url} is incorrect, double check spelling.`,
      );

    this.loaders.gltfLoader = new GLTFLoader(this.loadingManger);
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManger);
    this.loaders.cubeLoader = new THREE.CubeTextureLoader(this.loadingManger);
  }

  startLoading() {
    for (const source of this.sources) {
      // console.log(source);
      switch (source.type) {
        case "gltfModel":
          this.loaders.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
        case "texture":
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
        case "cubeTexture":
          this.loaders.cubeLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
        default:
          console.error(`need a new loader for type "${source.type}"`);
          break;
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }

  constructor(sources) {
    super();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }
}
