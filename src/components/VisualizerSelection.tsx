import { store, Visualizers } from "../store";
import { styled } from "../style";

import { Select } from "./Select";

export const VisualizerSelection = () => {
  return (
    <VisualizerSelectionContainer>
      <Select
        label="Visualizer"
        value={store.state.visualizer as any as Visualizers}
        onChange={e =>
          (store.state.visualizer.value = e.target.value as Visualizers)
        }
      >
        <option value="expansion-ring">Expansion ring</option>
        <option value="bloat-ring">Bloat ring</option>
        <option value="star-field">Star field</option>
      </Select>
    </VisualizerSelectionContainer>
  );
};

const VisualizerSelectionContainer = styled("div", {
  position: "absolute",
  top: 16,
  left: 16,
});
