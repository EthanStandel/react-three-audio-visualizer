import { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { GoMarkGithub } from "react-icons/go";

import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { store } from "../store";
import { styled } from "../style";

import { IconButton } from "./IconButton";
import { SeekBar } from "./SeekBar";

const printTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds - minutes * 60);
  const minutesPrint = minutes.toString().padStart(2, "0");
  const secondsPrint = seconds.toString().padStart(2, "0");

  return `${minutesPrint}:${secondsPrint}`;
};

export const PlayBar = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState("--:--");
  const [place, setPlace] = useState("00:00");
  const song =
    typeof store.state.currentSongIndex.value === "number"
      ? store.state.songs.value[store.state.currentSongIndex.value]
      : undefined;

  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl && song?.uri) {
      if (!store.state.audio.peek()()) {
        const context = new AudioContext();
        const source = context.createMediaElementSource(audioEl);
        const analyzer = context.createAnalyser();
        analyzer.connect(context.destination);
        analyzer.fftSize = 256;
        const frequencyDataBuffer = new Uint8Array(analyzer.frequencyBinCount);
        source.connect(analyzer);
        store.state.audio.value = () => ({
          context,
          source,
          analyzer,
          frequencyDataBuffer,
        });
      }
      audioEl.play();
    }
  }, [song?.uri]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && song?.uri) {
      if (!store.state.playing.value) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [store.state.playing.value]);

  useAnimationFrame(() => {
    const audio = audioRef.current;
    if (audio) {
      setPlace(printTime(audio.currentTime));
    }
  }, []);

  const nextTrack = () => {
    if (typeof store.state.currentSongIndex.peek() === "number") {
      if (
        store.state.currentSongIndex.peek()! <
        store.state.songs.peek().length - 1
      ) {
        store.setCurrentSongIndex(store.state.currentSongIndex.peek()! + 1);
      } else {
        store.setCurrentSongIndex(0);
      }
    }
  };

  const prevTrack = () => {
    if (typeof store.state.currentSongIndex.peek() === "number") {
      if (store.state.currentSongIndex.peek()! > 0) {
        store.setCurrentSongIndex(store.state.currentSongIndex.peek()! - 1);
      } else {
        store.setCurrentSongIndex(store.state.songs.peek().length - 1);
      }
    }
  };

  return (
    <PlayBarContainer>
      <SeekBar audioRef={audioRef} />
      <IconButton
        disabled={!song}
        aria-label="previous track"
        onDoubleClick={() => prevTrack()}
        onClick={() => {
          const audio = audioRef.current;
          if (audio) {
            audio.currentTime = 0;
          }
        }}
      >
        <GiPreviousButton size={16} />
      </IconButton>
      <IconButton
        aria-label="play / pause"
        size="big"
        disabled={!song}
        onClick={() =>
          (store.state.playing.value = !store.state.playing.peek())
        }
      >
        {store.state.playing.value ? (
          <FaPause size={24} />
        ) : (
          <FaPlay size={24} />
        )}
      </IconButton>
      <IconButton
        disabled={!song}
        onClick={() => nextTrack()}
        aria-label="next track"
      >
        <GiNextButton size={16} />
      </IconButton>
      <Duration>
        {place} / {duration}
      </Duration>
      <Title>
        <strong>{song?.song ?? ""}</strong>
        <span>{song ? "by " + song.artist : ""}</span>
      </Title>
      <audio
        ref={audioRef}
        onPause={event =>
          (store.state.playing.value = !event.currentTarget.paused)
        }
        onPlay={event =>
          (store.state.playing.value = !event.currentTarget.paused)
        }
        onDurationChange={event => {
          const duration = event.currentTarget.duration;
          const minutes = Math.floor(duration / 60);
          const seconds = Math.floor(duration - minutes * 60);
          const minutesPrint = minutes.toString().padStart(2, "0");
          const secondsPrint = seconds.toString().padStart(2, "0");
          setDuration(`${minutesPrint}:${secondsPrint}`);
        }}
        src={song?.uri ?? ""}
      />
      <GithubLink
        aria-label="github link"
        href="https://github.com/EthanStandel/react-three-audio-visualizer"
      >
        <GoMarkGithub size={36} />
      </GithubLink>
    </PlayBarContainer>
  );
};

const PlayBarContainer = styled("div", {
  width: "100vw",
  position: "relative",
  height: 72,
  display: "flex",
  alignItems: "center",
  background: "var(--plt-crd)",
});

const Duration = styled("p", {
  padding: "1em",
  "@mobile": {
    flexGrow: 1,
  },
});

const Title = styled("p", {
  padding: "1em",
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "> strong": {
    marginRight: ".5em",
  },
  "@mobile": {
    display: "none",
  },
});

const GithubLink = styled("a", {
  all: "unset",
  cursor: "pointer",
  height: 48,
  width: 48,
  borderRadius: 24,
  marginRight: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--plt-bg)",
  justifySelf: "flex-end",
});
