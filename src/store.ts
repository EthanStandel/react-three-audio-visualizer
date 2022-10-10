import { deepSignal } from "@deepsignal/react";

import { Song, SongList } from "./models/song";

export type AudioData = {
  context: AudioContext;
  source: MediaElementAudioSourceNode;
  analyzer: AnalyserNode;
  frequencyDataBuffer: Uint8Array;
};

export type Visualizers = "expansion-ring" | "bloat-ring" | "star-field";

const state = deepSignal({
  songs: [] as Array<Song>,
  currentSongIndex: undefined as number | undefined,
  playing: false as boolean,
  visualizer: "expansion-ring" as Visualizers,
  audio: () => undefined as AudioData | undefined,
});

export const store = {
  state,
  setCurrentSongIndex: async (currentSongIndex: number) => {
    const song = state.songs.peek()[currentSongIndex];
    if (!song) {
      throw new Error(`Song for index ${currentSongIndex} does not exist`);
    }

    state.currentSongIndex.value = currentSongIndex;
    state.playing.value = true;
  },
  setPlaying: (playing: boolean) => {
    if (playing && typeof state.currentSongIndex.peek() !== "number") {
      throw new Error("Can't start playing because there is no active song");
    }

    state.playing.value = playing;
  },
};

const fetchSongs = async () => {
  const response = await fetch("/content-manifest.json");
  if (!response.ok) {
    throw new Error("Failed to fetch content manifest");
  }

  const { songs }: SongList = await response.json();
  state.songs.value = songs;
};

fetchSongs();
