import React, { RefObject } from "react";
import * as THREE from "three";
interface Props {
  refrence: RefObject<THREE.Mesh> | undefined;
}
const Box = ({ refrence }: Props) => {
  return (
    <mesh
      ref={refrence}
      rotation-y={Math.PI * 0.25}
      position={[2, 0, 0]}
      scale={1.5}
    >
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
};

export default Box;
