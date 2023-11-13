import React, { Component, RefObject, MutableRefObject, useRef } from "react";
import * as THREE from "three";
import {
  extend,
  useFrame,
  useThree,
  ReactThreeFiber,
} from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Box } from ".";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

interface Props {}

const Experince = (props: Props) => {
  const { camera, gl } = useThree();
  const cubeRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (cubeRef.current) cubeRef.current.rotation.y += delta;
    // const angle = state.clock.elapsedTime ;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0)
    // groupRef.current.rotation.y += delta;
    // console.log("tick");
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} />
      <ambientLight intensity={0.3} />
      <group ref={groupRef}>
        <Box refrence={cubeRef} />
      </group>
    </>
  );
};

export default Experince;
