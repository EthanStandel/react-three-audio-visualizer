import React from "react";

import { Canvas } from "@react-three/fiber";
import { styled } from "@stitches/react";

import { store, Visualizers } from "../store";

import { BloatRing } from "./visualizers/BloatRing";
import { ExpansionRing } from "./visualizers/ExpansionRing";
import { StarField } from "./visualizers/StarField";

const visualizers: Record<Visualizers, React.FC> = {
  "expansion-ring": ExpansionRing,
  "bloat-ring": BloatRing,
  "star-field": StarField,
};

export const VisualOutput = () => {
  const Visualizer = visualizers[store.state.visualizer.value];

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
