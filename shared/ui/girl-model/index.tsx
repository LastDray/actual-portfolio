"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import css from "./girl-model.module.css";
import clsx from "clsx";

function Box(props: MeshProps) {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => {
    // @ts-ignore
    if (ref.current !== null) return (ref.current.rotation.x += delta);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Model(props: any) {
  const { scene } = useGLTF("/mita.glb"); // помести модель в public/models/
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      // @ts-ignore
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive object={scene} ref={ref} {...props} />;
}

export type GirlModelProps = {
  className?: string;
};

export default function GirlModel({ className }: GirlModelProps) {
  return (
    <div id="canvas-container" className={clsx(css.canvasContainer, className)}>
      <Canvas className={css.canvas} style={{ pointerEvents: "none" }}>
        <Model position={[2, -1, 2]} scale={2} rotation={[0, -0.5, 0]} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
