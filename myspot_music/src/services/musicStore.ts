import { create } from 'zustand';
import { Song, PlayerState, RepeatMode } from '@/types';

interface MusicStore extends PlayerState {
  // Actions
  setCurrentSong: (song: Song | null) => void;
  setPlaying: (isPlaying: boolean) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setRepeatMode: (mode: RepeatMode) => void;
  toggleShuffle: () => void;
  setQueue: (songs: Song[], currentIndex?: number) => void;
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  
  // Library
  songs: Song[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  favorites: string[]; // song IDs
  
  // Library actions
  setSongs: (songs: Song[]) => void;
  setAlbums: (albums: Album[]) => void;
  setArtists: (artists: Artist[]) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  toggleFavorite: (songId: string) => void;
  addPlaylist: (playlist: Playlist) => void;
  updatePlaylist: (playlist: Playlist) => void;
  deletePlaylist: (playlistId: string) => void;
  addToPlaylist: (playlistId: string, song: Song) => void;
  removeFromPlaylist: (playlistId: string, songId: string) => void;
}

// Import types for Album, Artist, Playlist
import type { Album, Artist, Playlist } from '@/types';

export const useMusicStore = create<MusicStore>((set, get) => ({
  // Player state
  currentSong: null,
  isPlaying: false,
  position: 0,
  duration: 0,
  volume: 1,
  repeatMode: 'off',
  isShuffled: false,
  queue: [],
  currentIndex: -1,
  
  // Library state
  songs: [],
  albums: [],
  artists: [],
  playlists: [],
  favorites: [],
  
  // Player actions
  setCurrentSong: (song) => set({ currentSong: song }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setPosition: (position) => set({ position }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setRepeatMode: (mode) => set({ repeatMode: mode }),
  toggleShuffle: () => {
    const { isShuffled, queue, currentIndex } = get();
    if (!isShuffled) {
      // Shuffle the queue
      const shuffled = [...queue].sort(() => Math.random() - 0.5);
      set({ isShuffled: true, queue: shuffled });
    } else {
      // TODO: Restore original order
      set({ isShuffled: false });
    }
  },
  setQueue: (songs, currentIndex = 0) => set({ queue: songs, currentIndex }),
  playSong: (song, queue) => {
    if (queue) {
      const index = queue.findIndex(s => s.id === song.id);
      set({ 
        currentSong: song, 
        queue, 
        currentIndex: index >= 0 ? index : 0,
        isPlaying: true,
        position: 0 
      });
    } else {
      set({ 
        currentSong: song, 
        isPlaying: true,
        position: 0 
      });
    }
  },
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playNext: () => {
    const { queue, currentIndex, repeatMode } = get();
    if (queue.length === 0) return;
    
    let nextIndex = currentIndex + 1;
    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return;
      }
    }
    
    set({ 
      currentSong: queue[nextIndex],
      currentIndex: nextIndex,
      isPlaying: true,
      position: 0 
    });
  },
  playPrevious: () => {
    const { queue, currentIndex, position, repeatMode } = get();
    if (queue.length === 0) return;
    
    // If more than 3 seconds in, restart current song
    if (position > 3) {
      set({ position: 0 });
      return;
    }
    
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      if (repeatMode === 'all') {
        prevIndex = queue.length - 1;
      } else {
        prevIndex = 0;
      }
    }
    
    set({ 
      currentSong: queue[prevIndex],
      currentIndex: prevIndex,
      isPlaying: true,
      position: 0 
    });
  },
  
  // Library actions
  setSongs: (songs) => set({ songs }),
  setAlbums: (albums) => set({ albums }),
  setArtists: (artists) => set({ artists }),
  setPlaylists: (playlists) => set({ playlists }),
  toggleFavorite: (songId) => {
    const { favorites } = get();
    if (favorites.includes(songId)) {
      set({ favorites: favorites.filter(id => id !== songId) });
    } else {
      set({ favorites: [...favorites, songId] });
    }
  },
  addPlaylist: (playlist) => {
    const { playlists } = get();
    set({ playlists: [...playlists, playlist] });
  },
  updatePlaylist: (playlist) => {
    const { playlists } = get();
    set({ 
      playlists: playlists.map(p => p.id === playlist.id ? playlist : p) 
    });
  },
  deletePlaylist: (playlistId) => {
    const { playlists } = get();
    set({ playlists: playlists.filter(p => p.id !== playlistId) });
  },
  addToPlaylist: (playlistId, song) => {
    const { playlists } = get();
    set({
      playlists: playlists.map(p => {
        if (p.id === playlistId && !p.songs.find(s => s.id === song.id)) {
          return { ...p, songs: [...p.songs, song], updatedAt: new Date() };
        }
        return p;
      })
    });
  },
  removeFromPlaylist: (playlistId, songId) => {
    const { playlists } = get();
    set({
      playlists: playlists.map(p => {
        if (p.id === playlistId) {
          return { 
            ...p, 
            songs: p.songs.filter(s => s.id !== songId),
            updatedAt: new Date()
          };
        }
        return p;
      })
    });
  },
}));
