import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/utils/constants';
import { SectionHeader, PlaylistCard, SongCard } from '@/components';
import { useMusicStore } from '@/services/musicStore';

export const HomeScreen: React.FC = () => {
  const { songs, albums, artists, playlists, currentSong, isPlaying, playSong } = useMusicStore();

  const recentlyPlayed = songs.slice(0, 6);
  const topPlaylists = playlists.length > 0 ? playlists.slice(0, 5) : [];
  const topArtists = artists.slice(0, 5);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bon matin';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
      </View>

      {/* Quick Picks Grid */}
      <View style={styles.quickPicksGrid}>
        {recentlyPlayed.slice(0, 6).map((song, index) => (
          <TouchableOpacity
            key={song.id}
            style={[
              styles.quickPickItem,
              { backgroundColor: index % 2 === 0 ? COLORS.surfaceLight : COLORS.surface }
            ]}
            onPress={() => playSong(song, recentlyPlayed)}
          >
            <View style={styles.quickPickCover}>
              <Text style={styles.musicNote}>♪</Text>
            </View>
            <Text style={styles.quickPickTitle} numberOfLines={2}>
              {song.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Récemment écouté" />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {recentlyPlayed.map((song) => (
              <View key={song.id} style={styles.songCardWrapper}>
                <SongCard
                  title={song.title}
                  artist={song.artist}
                  coverArt={song.coverArt}
                  duration={song.duration}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPress={() => playSong(song, recentlyPlayed)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Playlists */}
      {topPlaylists.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Vos Playlists" />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {topPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                title={playlist.name}
                description={`${playlist.songs.length} titres`}
                coverArt={playlist.coverArt}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Top Artists */}
      {topArtists.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Artistes populaires" />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {topArtists.map((artist) => (
              <View key={artist.id} style={styles.artistCard}>
                <View style={styles.artistAvatar}>
                  <Text style={styles.artistInitial}>
                    {artist.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.artistName} numberOfLines={1}>
                  {artist.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* All Songs */}
      {songs.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Toutes les chansons" />
          <View style={styles.songsList}>
            {songs.slice(0, 10).map((song) => (
              <SongCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                coverArt={song.coverArt}
                duration={song.duration}
                isPlaying={currentSong?.id === song.id && isPlaying}
                onPress={() => playSong(song, songs)}
              />
            ))}
          </View>
        </View>
      )}

      {/* Empty State */}
      {songs.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎵</Text>
          <Text style={styles.emptyTitle}>Aucune musique trouvée</Text>
          <Text style={styles.emptyDescription}>
            Importez vos musiques depuis votre bibliothèque pour commencer à écouter
          </Text>
        </View>
      )}

      {/* Bottom padding for mini player */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  quickPicksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  quickPickItem: {
    width: '48%',
    marginVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '4%',
  },
  quickPickCover: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicNote: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  quickPickTitle: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
    paddingHorizontal: SPACING.sm,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  horizontalScroll: {
    paddingHorizontal: SPACING.md,
  },
  songCardWrapper: {
    width: 280,
    marginRight: SPACING.md,
  },
  artistCard: {
    width: 100,
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  artistAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  artistInitial: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
  },
  artistName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    textAlign: 'center',
  },
  songsList: {
    paddingHorizontal: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
