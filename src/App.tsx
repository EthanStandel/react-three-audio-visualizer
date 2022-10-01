import { styled } from "@stitches/react";

import { PlayBar } from "./components/PlayBar";
import { SongPanel } from "./components/SongPanel";
import { VisualOutput } from "./components/VisualOutput";

export const App = () => (
  <Main>
    <ListAndVisualizerBox>
      <VisualOutput />
      <SongPanel />
    </ListAndVisualizerBox>
    <PlayBar />
  </Main>
);

const Main = styled("main", {
  width: "100vw",
  maxHeight: "100vh",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});
const ListAndVisualizerBox = styled("div", {
  flexGrow: 1,
  overflow: "hidden",
});
