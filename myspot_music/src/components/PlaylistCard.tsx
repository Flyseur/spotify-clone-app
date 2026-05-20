import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/utils/constants';

interface PlaylistCardProps {
  title: string;
  description?: string;
  coverArt?: string;
  onPress?: () => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  title,
  description,
  coverArt,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.coverContainer}>
        {coverArt ? (
          <Image source={{ uri: coverArt }} style={styles.coverArt} />
        ) : (
          <View style={[styles.coverArt, styles.coverPlaceholder]}>
            <Text style={styles.musicNote}>🎵</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      
      {description && (
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: SPACING.md,
  },
  coverContainer: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surfaceLight,
  },
  coverArt: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicNote: {
    fontSize: 48,
  },
  title: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
