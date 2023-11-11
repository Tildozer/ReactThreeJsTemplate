import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import { Sources } from "../World/mainSources";
interface Loaders {
  gltfLoader: GLTFLoader;
  textureLoader: THREE.TextureLoader;
  cubeLoader: THREE.CubeTextureLoader;
}

interface Items {
  [key: string]: GLTF | THREE.Texture;
}

export default class Resources extends EventEmitter {
  // public loaders:
  public items: Items;
  public toLoad: number;
  public loaded: number;
  public sources: Sources[];
  public loaders: Loaders;
  public loadingManager: THREE.LoadingManager;

  setLoaders() {
    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.onLoad = () => console.log("done loading.");
    this.loadingManager.onError = (url) =>
      console.error(
        `the assest URL ${url} is incorrect, double check spelling.`,
      );

    this.loaders = {
      gltfLoader: new GLTFLoader(this.loadingManager),
      textureLoader: new THREE.TextureLoader(this.loadingManager),
      cubeLoader: new THREE.CubeTextureLoader(this.loadingManager),
    };
  }

  startLoading() {
    for (const source of this.sources) {
      if (typeof source.path === "string") {
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
        }
      } else {
        switch (source.type) {
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
      // console.log(source);
    }
  }

  sourceLoaded(source: Sources, file: GLTF | THREE.Texture) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }

  constructor(sources: Sources[]) {
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
