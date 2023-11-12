export default class Environment {
  setSunlight() {
    //   this.sunlight = new THREE.DirectionalLight("#ffffff", 4);
    //   this.sunlight.castShadow = true;
    //   this.sunlight.shadow.camera.far = 15;
    //   this.sunlight.shadow.mapSize.set(1024, 1024);
    //   this.sunlight.shadow.normalBias = 0.05;
    //   this.sunlight.position.set(3.5, 2, -1.25);
    //   this.scene.add(this.sunlight);
  }

  setEvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    // console.log(this.resources.entexture);
    // console.log(this.environmentMap.texture);

    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    // this.scene.background = this.environmentMap
    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
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
      console.log(this.environmentMap);
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
