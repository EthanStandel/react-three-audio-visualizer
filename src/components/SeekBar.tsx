import { FC, useEffect, useRef } from "react";

import { styled } from "@stitches/react";

import { useAnimationFrame } from "../hooks/useAnimationFrame";

export const SeekBar: FC<{
  audioRef: { current: HTMLAudioElement | null };
}> = ({ audioRef }) => {
  const seekBarRef = useRef<HTMLDivElement>(null);

  useAnimationFrame(() => {
    const audio = audioRef.current;
    const seekBar = seekBarRef.current;
    if (audio && seekBar) {
      if (!audio.paused) {
        const seek = (audio.currentTime / audio.duration) * 100;
        seekBar.style.width = `${seek.toFixed(2)}%`;
      }
    } else if (!audio && seekBar) {
      seekBar.style.width = "0";
    }
  }, []);

  return (
    <SeekBarContainer
      onClick={event => {
        const seekBar = seekBarRef.current;
        const audio = audioRef.current;
        if (seekBar && audio) {
          const seek = event.clientX / event.currentTarget.clientWidth;
          seekBar.style.width = `${(seek * 100).toFixed(2)}%`;
          audio.currentTime = seek * audio.duration;
        }
      }}
    >
      <SeekBarBase />
      <SeekBarFill ref={seekBarRef} />
    </SeekBarContainer>
  );
};

const SeekBarContainer = styled("div", {
  cursor: "pointer",
  height: 5,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
});

const SeekBarFill = styled("div", {
  height: 5,
  position: "absolute",
  top: 0,
  background: "var(--plt-prmy)",
});

const SeekBarBase = styled("div", {
  width: "100%",
  height: 5,
  background: "var(--plt-dsbld)",
});
