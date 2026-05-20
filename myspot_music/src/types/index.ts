export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  uri: string;
  coverArt?: string;
  trackNumber?: number;
  year?: number;
  genre?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverArt?: string;
  year?: number;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  coverArt?: string;
  songs: Song[];
  albums: Album[];
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArt?: string;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
}

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  volume: number;
  repeatMode: RepeatMode;
  isShuffled: boolean;
  queue: Song[];
  currentIndex: number;
}

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  accent: string;
  error: string;
}
