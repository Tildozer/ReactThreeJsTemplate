import React from "react";

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1, 0]} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color={"greenyellow"} />
    </mesh>
  );
};

export default Floor;
