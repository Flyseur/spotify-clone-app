import * as MediaLibrary from 'expo-media-library';
import { Song, Album, Artist } from '@/types';

export class MusicLibraryService {
  private static instance: MusicLibraryService;
  
  private constructor() {}
  
  static getInstance(): MusicLibraryService {
    if (!MusicLibraryService.instance) {
      MusicLibraryService.instance = new MusicLibraryService();
    }
    return MusicLibraryService.instance;
  }
  
  async requestPermission(): Promise<boolean> {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  }
  
  async getPermissionStatus(): Promise<'granted' | 'denied' | 'undetermined'> {
    const { status } = await MediaLibrary.getPermissionsAsync();
    return status;
  }
  
  async scanLocalMusic(): Promise<{ songs: Song[], albums: Album[], artists: Artist[] }> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error('Permission to access media library was denied');
      }
      
      // Fetch audio files from the device
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 1000, // Adjust based on needs
        sortBy: MediaLibrary.SortBy.default,
      });
      
      const songs: Song[] = [];
      const albumMap = new Map<string, Song[]>();
      const artistMap = new Map<string, Song[]>();
      
      media.assets.forEach((asset) => {
        // Create a unique ID for each song
        const id = asset.id || `${asset.filename}-${asset.duration}`;
        
        const song: Song = {
          id,
          title: asset.filename.replace(/\.[^/.]+$/, '') || 'Unknown Title',
          artist: asset.artist || 'Unknown Artist',
          album: asset.album || 'Unknown Album',
          duration: asset.duration ? Math.round(asset.duration * 1000) : 0,
          uri: asset.uri,
          coverArt: undefined, // Will be populated later
          year: asset.creationTime ? new Date(asset.creationTime).getFullYear() : undefined,
        };
        
        songs.push(song);
        
        // Group by album
        if (!albumMap.has(song.album)) {
          albumMap.set(song.album, []);
        }
        albumMap.get(song.album)!.push(song);
        
        // Group by artist
        if (!artistMap.has(song.artist)) {
          artistMap.set(song.artist, []);
        }
        artistMap.get(song.artist)!.push(song);
      });
      
      // Convert maps to Album and Artist arrays
      const albums: Album[] = Array.from(albumMap.entries()).map(([title, albumSongs], index) => ({
        id: `album-${index}`,
        title,
        artist: albumSongs[0]?.artist || 'Unknown Artist',
        songs: albumSongs,
        year: albumSongs[0]?.year,
      }));
      
      const artists: Artist[] = Array.from(artistMap.entries()).map(([name, artistSongs]) => {
        const artistAlbums = Array.from(
          new Map(artistSongs.map(s => [s.album, s.album]))
        ).map(([albumTitle]) => ({
          id: `artist-album-${albumTitle}`,
          title: albumTitle,
          artist: name,
          songs: artistSongs.filter(s => s.album === albumTitle),
        }));
        
        return {
          id: `artist-${name}`,
          name,
          songs: artistSongs,
          albums: artistAlbums,
        };
      });
      
      return { songs, albums, artists };
    } catch (error) {
      console.error('Error scanning local music:', error);
      return { songs: [], albums: [], artists: [] };
    }
  }
  
  async getAlbumArtwork(albumId?: string): Promise<string | undefined> {
    try {
      // This would require additional native module or expo-media-library features
      // For now, return undefined - can be enhanced later
      return undefined;
    } catch (error) {
      console.error('Error getting album artwork:', error);
      return undefined;
    }
  }
}

export const musicLibraryService = MusicLibraryService.getInstance();
