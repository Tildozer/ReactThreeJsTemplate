import * as THREE from "three";
import * as lilGUI from "lil-gui";
import { Experience } from "..";
import { Debug, Resources } from "../Utils";
import { GLTF } from "three/examples/jsm/Addons.js";

type Texture = {colorSpace : THREE.ColorSpace}
interface EnvironmentMap {
    intensity: number
    texture: THREE.Texture | undefined
    updateMaterials: () => void
}
export default class Environment {
  public experience : Experience
  public scene : THREE.Scene
  public resources : Resources
  public debug: Debug
  public debugFolder : lilGUI.GUI
  public environmentMap : EnvironmentMap;
  public sunlight: THREE.DirectionalLight = new THREE.DirectionalLight("#ffffff", 4);

  setSunlight() {
    //   this.sunlight = new THREE.DirectionalLight();
      this.sunlight.castShadow = true;
      this.sunlight.shadow.camera.far = 15;
      this.sunlight.shadow.mapSize.set(1024, 1024);
      this.sunlight.shadow.normalBias = 0.05;
      this.sunlight.position.set(3.5, 2, -1.25);
      this.scene.add(this.sunlight);
  }

  
  setEvironmentMap() {

    this.environmentMap = {
      intensity: 0.4,
      texture: this.resources.items.environmentMapTexture,
      updateMaterials : () => {
        this.scene.traverse((child) => {
          if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
          ) {
            if(this.environmentMap.texture) 
            child.material.envMap = this.environmentMap.texture;
            child.material.envMapIntensity = this.environmentMap.intensity;
            child.material.needsUpdate = true;
          }
        });
      }
    };
    if(this.environmentMap.texture){
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
        this.scene.environment = this.environmentMap.texture;
    }
    // this.environmentMap.texture = ;
    // console.log(this.resources.entexture);
    // console.log(this.environmentMap.texture);


    // this.scene.background = this.environmentMap


    this.environmentMap.updateMaterials();
  }

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.setSunlight();
    this.setEvironmentMap();
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("enviroment");
    //   console.log(this.environmentMap);
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);

      this.debugFolder
        .add(this.sunlight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);
    }
  }
}
