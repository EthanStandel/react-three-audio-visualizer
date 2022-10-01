import { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause } from "react-icons/fa";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { GoMarkGithub } from "react-icons/go";

import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useStore } from "../store";
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
  const {
    currentSongIndex,
    setCurrentSongIndex,
    songs,
    playing,
    setPlaying,
    setAudio,
    audio,
  } = useStore();
  const song =
    typeof currentSongIndex === "number" ? songs[currentSongIndex] : undefined;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && song?.uri) {
      audio.play();
    }
  }, [song?.uri]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && song?.uri) {
      if (!playing) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [playing]);

  useAnimationFrame(() => {
    const audio = audioRef.current;
    if (audio) {
      setPlace(printTime(audio.currentTime));
    }
  }, []);

  const nextTrack = () => {
    if (typeof currentSongIndex === "number") {
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        setCurrentSongIndex(0);
      }
    }
  };

  const prevTrack = () => {
    if (typeof currentSongIndex === "number") {
      if (currentSongIndex > 0) {
        setCurrentSongIndex(currentSongIndex - 1);
      } else {
        setCurrentSongIndex(songs.length - 1);
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
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <FaPause size={24} /> : <FaPlay size={24} />}
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
        onPause={event => setPlaying(!event.currentTarget.paused)}
        onPlay={event => setPlaying(!event.currentTarget.paused)}
        onDurationChange={event => {
          const duration = event.currentTarget.duration;
          const minutes = Math.floor(duration / 60);
          const seconds = Math.floor(duration - minutes * 60);
          const minutesPrint = minutes.toString().padStart(2, "0");
          const secondsPrint = seconds.toString().padStart(2, "0");
          setDuration(`${minutesPrint}:${secondsPrint}`);
          if (!audio) {
            const context = new AudioContext();
            const source = context.createMediaElementSource(
              event.currentTarget
            );
            const analyzer = context.createAnalyser();
            analyzer.connect(context.destination);
            analyzer.fftSize = 256;
            const frequencyDataBuffer = new Uint8Array(
              analyzer.frequencyBinCount
            );
            source.connect(analyzer);
            setAudio({ context, source, analyzer, frequencyDataBuffer });
          }
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
