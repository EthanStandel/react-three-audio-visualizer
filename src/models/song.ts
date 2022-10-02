export type Song = {
  uri: string;
  artist: string;
  song: string;
  source: string;
  license: string;
};

export type SongList = {
  songs: Array<Song>;
};
