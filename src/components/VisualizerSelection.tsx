import { useStore, Store } from "../store";
import { styled } from "../style";

import { Select } from "./Select";

export const VisualizerSelection = () => {
  const { visualizer, setVisualizer } = useStore(
    ({ visualizer, setVisualizer }) => ({
      visualizer,
      setVisualizer,
    })
  );

  return (
    <VisualizerSelectionContainer>
      <Select
        label="Visualizer"
        value={visualizer}
        onChange={e => setVisualizer(e.target.value as Store["visualizer"])}
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
