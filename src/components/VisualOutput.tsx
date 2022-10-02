import React, { FC, useRef } from "react";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, MeshProps, ThreeElements, useFrame } from "@react-three/fiber";
import { styled } from "@stitches/react";

import { Store, useStore } from "../store";

import { BloatRing } from "./visualizers/BloatRing";
import { ExpansionRing } from "./visualizers/ExpansionRing";

const visualizers: Record<Store["visualizer"], React.FC> = {
  "expansion-ring": ExpansionRing,
  "bloat-ring": BloatRing,
};

export const VisualOutput = () => {
  const visualizer = useStore(store => store.visualizer);
  const Visualizer = visualizers[visualizer];

  return (
    <VisualOutputContainer>
      <Canvas>
        <Visualizer />
      </Canvas>
    </VisualOutputContainer>
  );
};

const VisualOutputContainer = styled("div", {
  height: "100%",
  flexGrow: 1,
});
