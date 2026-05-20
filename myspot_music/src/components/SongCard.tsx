import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/utils/constants';

interface SongCardProps {
  title: string;
  artist: string;
  coverArt?: string;
  duration?: number;
  onPress?: () => void;
  isPlaying?: boolean;
}

export const SongCard: React.FC<SongCardProps> = ({
  title,
  artist,
  coverArt,
  duration,
  onPress,
  isPlaying = false,
}) => {
  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, isPlaying && styles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.coverContainer}>
        {coverArt ? (
          <View style={[styles.coverArt, { backgroundColor: COLORS.surfaceLight }]}>
            {/* Image component will be added later */}
          </View>
        ) : (
          <View style={[styles.coverArt, styles.coverPlaceholder]}>
            <Text style={styles.musicNote}>♪</Text>
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text 
          style={[styles.title, isPlaying && styles.titleActive]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text 
          style={styles.artist}
          numberOfLines={1}
        >
          {artist}
        </Text>
      </View>
      
      {duration && (
        <Text style={styles.duration}>
          {formatDuration(duration)}
        </Text>
      )}
      
      {isPlaying && (
        <View style={styles.playingIndicator}>
          <View style={[styles.equalizerBar, { animationDelay: '0ms' }]} />
          <View style={[styles.equalizerBar, { animationDelay: '150ms' }]} />
          <View style={[styles.equalizerBar, { animationDelay: '300ms' }]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'transparent',
  },
  containerActive: {
    backgroundColor: COLORS.surfaceLight,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPlaceholder: {
    backgroundColor: COLORS.surfaceLight,
  },
  musicNote: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  infoContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  titleActive: {
    color: COLORS.primary,
  },
  artist: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  duration: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 20,
    gap: 2,
  },
  equalizerBar: {
    width: 3,
    height: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
});
