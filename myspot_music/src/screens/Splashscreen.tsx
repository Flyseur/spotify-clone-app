import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONT_SIZES } from '@/utils/constants';
import { musicLibraryService } from '@/services/musicLibrary';
import { useMusicStore } from '@/services/musicStore';

interface SplashscreenProps {
  onFinish?: () => void;
}

export const Splashscreen: React.FC<SplashscreenProps> = ({ onFinish }) => {
  const { setSongs, setAlbums, setArtists } = useMusicStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Scan local music library
        const { songs, albums, artists } = await musicLibraryService.scanLocalMusic();
        
        // Update store with scanned data
        setSongs(songs);
        setAlbums(albums);
        setArtists(artists);
        
        // Wait a bit for smooth animation
        setTimeout(() => {
          onFinish?.();
        }, 1500);
      } catch (error) {
        console.error('Error initializing app:', error);
        // Still continue to main app even if scan fails
        setTimeout(() => {
          onFinish?.();
        }, 1500);
      }
    };

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🎵</Text>
        <Text style={styles.logoText}>MySpot</Text>
        <Text style={styles.logoSubtext}>Music</Text>
      </View>
      
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      
      <Text style={styles.loadingText}>Chargement de votre bibliothèque...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -1,
  },
  logoSubtext: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primary,
    marginTop: 4,
  },
  loader: {
    marginBottom: 24,
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
});
