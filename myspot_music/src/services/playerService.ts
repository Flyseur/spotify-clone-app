import TrackPlayer, {
  Event,
  Track,
  usePlaybackState,
  State,
  Capability,
} from 'react-native-track-player';
import { useEffect } from 'react';
import { useMusicStore } from './musicStore';
import type { Song } from '@/types';

export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    
    // Add event listeners
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      const { togglePlayPause } = useMusicStore.getState();
      togglePlayPause();
    });
    
    TrackPlayer.addEventListener(Event.RemotePause, () => {
      const { setPlaying } = useMusicStore.getState();
      setPlaying(false);
    });
    
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
      const { playNext } = useMusicStore.getState();
      playNext();
    });
    
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      const { playPrevious } = useMusicStore.getState();
      playPrevious();
    });
    
    TrackPlayer.addEventListener(Event.RemoteStop, () => {
      const { setPlaying } = useMusicStore.getState();
      setPlaying(false);
    });
    
    // Playback state update listener
    TrackPlayer.addEventListener(Event.PlaybackState, (state) => {
      const { setPlaying, setPosition } = useMusicStore.getState();
      
      if (state.state === State.Playing) {
        setPlaying(true);
      } else if (state.state === State.Paused || state.state === State.Stopped) {
        setPlaying(false);
      }
    });
    
    // Progress update listener
    TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, (event) => {
      const { setPosition, setDuration } = useMusicStore.getState();
      setPosition(event.position * 1000);
      setDuration(event.duration * 1000);
    });
    
    // Update progress every second
    await TrackPlayer.updateOptions({
      progressUpdateEventInterval: 1,
    });
    
  } catch (error) {
    console.error('Error setting up player:', error);
  }
};

export const convertSongToTrack = (song: Song): Track => ({
  id: song.id,
  url: song.uri,
  title: song.title,
  artist: song.artist,
  album: song.album,
  duration: song.duration / 1000,
  artwork: song.coverArt,
});

export const usePlayerHook = () => {
  const playbackState = usePlaybackState();
  
  return {
    isPlaying: playbackState.state === State.Playing,
    isPaused: playbackState.state === State.Paused,
    isLoading: playbackState.state === State.Loading || playbackState.state === State.Buffering,
    isStopped: playbackState.state === State.Stopped || playbackState.state === State.None,
    state: playbackState.state,
  };
};

export const playerService = {
  async play(song: Song) {
    try {
      const track = convertSongToTrack(song);
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing song:', error);
    }
  },
  
  async pause() {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error('Error pausing:', error);
    }
  },
  
  async resume() {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error resuming:', error);
    }
  },
  
  async togglePlayPause() {
    const state = await TrackPlayer.getPlaybackState();
    if (state.state === State.Playing) {
      await this.pause();
    } else {
      await this.resume();
    }
  },
  
  async stop() {
    try {
      await TrackPlayer.stop();
    } catch (error) {
      console.error('Error stopping:', error);
    }
  },
  
  async seek(position: number) {
    try {
      await TrackPlayer.seekTo(position / 1000);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  },
  
  async skipToNext() {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.error('Error skipping to next:', error);
    }
  },
  
  async skipToPrevious() {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.error('Error skipping to previous:', error);
    }
  },
  
  async setVolume(volume: number) {
    try {
      await TrackPlayer.setVolume(volume);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  },
  
  async getProgress() {
    try {
      const progress = await TrackPlayer.getProgress();
      return {
        position: progress.position * 1000,
        duration: progress.duration * 1000,
      };
    } catch (error) {
      console.error('Error getting progress:', error);
      return { position: 0, duration: 0 };
    }
  },
};
