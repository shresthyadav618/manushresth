export type YouTubeSong = {
  id: string;
  title: string;
  artist: string;
  source: "youtube";
  youtubeId: string;
};

export type LocalSong = {
  id: string;
  title: string;
  artist: string;
  source: "local";
  src: string;
};

export type Song = YouTubeSong | LocalSong;

export function isYouTubeSong(song: Song): song is YouTubeSong {
  return song.source === "youtube";
}

export function isLocalSong(song: Song): song is LocalSong {
  return song.source === "local";
}

// Order is the playlist order. Add songs here only.
export const songs: Song[] = [
  {
    id: "baarishein",
    title: "Baarishein",
    artist: "Anuv Jain",
    source: "youtube",
    youtubeId: "tYqZK7bq5Bs",
  },
  {
    id: "salvatore",
    title: "Salvatore",
    artist: "Lana Del Rey",
    source: "youtube",
    youtubeId: "GVQON-muEFc",
  },
  {
    id: "lovesong",
    title: "Lovesong",
    artist: "Adele",
    source: "youtube",
    youtubeId: "0wPhbmeNSOs",
  },
  {
    id: "locked-out-of-heaven",
    title: "Locked Out of Heaven",
    artist: "Bruno Mars",
    source: "youtube",
    youtubeId: "e-fA-gBCkj0",
  },
  {
    id: "set-fire-to-the-rain",
    title: "Set Fire to the Rain",
    artist: "Adele",
    source: "youtube",
    youtubeId: "a2giXO6eyuI",
  },
  {
    id: "payphone",
    title: "Payphone",
    artist: "Maroon 5",
    source: "youtube",
    youtubeId: "KRaWnd3LJfs",
  },
  {
    id: "maand",
    title: "Maand",
    artist: "Bayaan, Hasan Raheem",
    source: "youtube",
    youtubeId: "D5v0P2-WLSo",
  },
];
