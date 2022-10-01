export type Song = {
  uri: string;
  artist: string;
  song: string;
  source: string;
};

export type SongList = {
  songs: Array<Song>;
};
