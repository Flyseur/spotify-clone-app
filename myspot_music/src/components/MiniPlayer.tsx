import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/utils/constants';
import type { Song } from '@/types';

interface MiniPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPress?: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  song,
  isPlaying,
  onPlayPause,
  onPress,
}) => {
  if (!song) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.coverContainer}>
          {song.coverArt ? (
            <Image source={{ uri: song.coverArt }} style={styles.coverArt} />
          ) : (
            <View style={[styles.coverArt, styles.coverPlaceholder]}>
              <Text style={styles.musicNote}>♪</Text>
            </View>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {song.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {song.artist}
          </Text>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onPlayPause}
          >
            <Text style={styles.icon}>
              {isPlaying ? '⏸' : '▶'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.playerBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  progressBar: {
    height: 2,
    backgroundColor: COLORS.surfaceLight,
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  coverContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  coverArt: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicNote: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  artist: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: SPACING.sm,
  },
  icon: {
    fontSize: 24,
    color: COLORS.text,
  },
});
