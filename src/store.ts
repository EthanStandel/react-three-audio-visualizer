import create from "zustand";

import { Song, SongList } from "./models/song";

export type Store = {
  songs: Array<Song>;
  currentSongIndex?: number;
  playing: boolean;
  fetchSongs: () => Promise<void>;
  setCurrentSongIndex: (index: number) => void;
  setPlaying: (playing: boolean) => void;
  visualizer: "expansion-ring" | "bloat-ring" | "star-field";
  setVisualizer: (visualizer: Store["visualizer"]) => void;
  audio?: {
    context: AudioContext;
    source: MediaElementAudioSourceNode;
    analyzer: AnalyserNode;
    frequencyDataBuffer: Uint8Array;
  };
  setAudio: (audio: Store["audio"]) => void;
};

export const useStore = create<Store>((set, get) => ({
  songs: [],
  currentSongIndex: undefined,
  playing: false,
  visualizer: "expansion-ring",
  setVisualizer: (visualizer: Store["visualizer"]) => {
    set({ visualizer });
  },
  fetchSongs: async () => {
    const response = await fetch("/content-manifest.json");
    if (!response.ok) {
      throw new Error("Failed to fetch content manifest");
    }

    const { songs }: SongList = await response.json();
    set({ songs });
  },
  setCurrentSongIndex: async currentSongIndex => {
    const song = get().songs[currentSongIndex];
    if (!song) {
      throw new Error(`Song for index ${currentSongIndex} does not exist`);
    }

    set({ currentSongIndex, playing: true });
  },
  setAudio: (audio: Store["audio"]) => {
    set({ audio });
  },
  setPlaying: playing => {
    const { currentSongIndex } = get();
    if (playing && typeof currentSongIndex !== "number") {
      throw new Error("Can't start playing because there is no active song");
    }

    set({ playing });
  },
}));

// initialize data
useStore.getState().fetchSongs();
