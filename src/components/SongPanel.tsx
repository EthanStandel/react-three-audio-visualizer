import { useEffect, useState } from "react";

import { styled } from "@stitches/react";
import {
  FaPlayCircle,
  FaCreativeCommons,
  FaCreativeCommonsNd,
  FaCreativeCommonsNc,
} from "react-icons/fa";
import { MdClose, MdMenu } from "react-icons/md";

import { store } from "../store";

import { IconButton } from "./IconButton";

export const SongPanel = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof store.state.currentSongIndex.peek() === "number") {
      setHide(true);
    }
  }, [store.state.currentSongIndex.value]);

  return (
    <>
      <SongPanelContainer hide={hide}>
        {store.state.songs.value.map(({ artist, song, license }, index) => (
          <ListItem
            key={artist + song}
            onClick={() => store.setCurrentSongIndex(index)}
            selected={store.state.currentSongIndex.value === index}
          >
            <FaPlayCircle />
            <span>
              {artist} - {song}
            </span>
            <LicenseLink aria-label="license" href={license}>
              <FaCreativeCommons />
              <FaCreativeCommonsNd aria-label="non derivative" />
              <FaCreativeCommonsNc aria-label="non commercial" />
            </LicenseLink>
          </ListItem>
        ))}
      </SongPanelContainer>
      <IconButton
        css={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
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
  zIndex: 1,
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

const LicenseLink = styled("a", {
  color: "var(--plt-txt)",
  display: "inline-flex",
  gap: ".5em",
});
