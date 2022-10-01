import { styled } from "@stitches/react";
import { FaPlayCircle } from "react-icons/fa";

import { useStore } from "../store";

export const SongPanel = () => {
  const { songs, setCurrentSongIndex, currentSongIndex } = useStore();

  return (
    <SongPanelContainer>
      {songs.map(({ artist, song }, index) => (
        <ListItem
          key={artist + song}
          onClick={() => setCurrentSongIndex(index)}
          selected={currentSongIndex === index}
        >
          <FaPlayCircle />
          <span>
            {artist} - {song}
          </span>
        </ListItem>
      ))}
    </SongPanelContainer>
  );
};

const SongPanelContainer = styled("div", {
  width: "25vw",
  height: "100%",
  background: "var(--plt-crd)",
  position: "relative",
});

const ListItem = styled("button", {
  all: "unset",
  width: "100%",
  lineHeight: 3,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "all var(--animate-time) ease",
  "> *": {
    transition: "transform var(--animate-time) ease",
    marginLeft: "1em",
  },
  "&:hover": {
    background: "var(--plt-bg)",
  },
  "&:active": {
    "> *": {
      transform: "scale(.9)",
    },
  },
  "&:focus-visible": {
    background: "var(--plt-bg)",
    "> *": {
      transform: "scale(1.1)",
    },
  },
  variants: {
    selected: {
      true: {
        color: "var(--plt-prmy)",
        background: "var(--plt-bg)",
      },
    },
  },
});
