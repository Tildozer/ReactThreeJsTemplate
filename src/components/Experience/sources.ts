export interface Sources {
  name: string;
  type: "cubeTexture" | "texture" | "gltfModel";
  path: string | string[];
}

export default [
  // Example
  // {
  //   name: "environmentMapTexture",
  //   type: "cubeTexture",
  //   path: [
  //     "textures/environmentMap/px.jpg",
  //     "textures/environmentMap/nx.jpg",
  //     "textures/environmentMap/py.jpg",
  //     "textures/environmentMap/ny.jpg",
  //     "textures/environmentMap/pz.jpg",
  //     "textures/environmentMap/nz.jpg",
  //   ],
  // },
  // {
  //   name: "dirtColorTexture",
  //   type: "texture",
  //   path: "textures/dirt/color.jpg",
  // },
];