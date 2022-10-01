import { useState } from "react";

import { styled } from "@stitches/react";
import { FaPlayCircle } from "react-icons/fa";
import { MdClose, MdMenu } from "react-icons/md";

import { useStore } from "../store";

import { IconButton } from "./IconButton";

export const SongPanel = () => {
  const [hide, setHide] = useState(false);
  const { songs, setCurrentSongIndex, currentSongIndex } = useStore();

  return (
    <>
      <SongPanelContainer hide={hide}>
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
      <IconButton
        css={{ position: "absolute", top: 16, right: 16 }}
        size="big"
        onClick={() => setHide(hide => !hide)}
      >
        {hide ? <MdMenu size={36} /> : <MdClose size={36} />}
      </IconButton>
    </>
  );
};

const SongPanelContainer = styled("div", {
  position: "absolute",
  width: "min(500px, 100%)",
  height: "100%",
  background: "var(--plt-crd)",
  right: 0,
  top: 0,
  transform: "translateX(0)",
  transition: "transform var(--animate-time) ease",
  variants: {
    hide: {
      true: {
        transform: "translateX(500px)",
      },
    },
  },
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
