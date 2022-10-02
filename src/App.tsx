import { styled } from "@stitches/react";

import { PlayBar } from "./components/PlayBar";
import { SongPanel } from "./components/SongPanel";
import { VisualOutput } from "./components/VisualOutput";
import { VisualizerSelection } from "./components/VisualizerSelection";

export const App = () => (
  <Main>
    <ListAndVisualizerBox>
      <VisualOutput />
      <SongPanel />
    </ListAndVisualizerBox>
    <PlayBar />
    <VisualizerSelection />
  </Main>
);

const Main = styled("main", {
  width: "100vw",
  maxHeight: "calc(var(--vh, 1vh) * 100)",
  height: "calc(var(--vh, 1vh) * 100)",
  display: "flex",
  flexDirection: "column",
});

const ListAndVisualizerBox = styled("div", {
  flexGrow: 1,
  overflow: "hidden",
});
