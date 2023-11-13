import React from "react";
import { Experince, Floor } from "../components";
import { Canvas } from "@react-three/fiber";
import "./index.css";

type Props = {};

const Main = (props: Props) => {
  return (
    <body className="h-screen w-screen">
      <Canvas
        className="bg-slate-800"
        camera={{
          // fov: 45,
          // zoom: 100,
          near: 0.1,
          far: 100,
          position: [3, 2, 6],
        }}
      >
        <Experince />
        <Floor />
      </Canvas>
    </body>
  );
};

export default Main;
