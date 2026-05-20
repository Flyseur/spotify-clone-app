import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '@/utils/constants';
import { Splashscreen, HomeScreen } from '@/screens';
import { MiniPlayer } from '@/components';
import { useMusicStore } from '@/services/musicStore';
import { playerService } from '@/services/playerService';

export const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentSong, isPlaying, togglePlayPause } = useMusicStore();

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleMiniPlayerPress = () => {
    // Navigate to full player screen (to be implemented)
    console.log('Navigate to full player');
  };

  if (isLoading) {
    return <Splashscreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <HomeScreen />
      
      {currentSong && (
        <MiniPlayer
          song={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => {
            togglePlayPause();
            playerService.togglePlayPause();
          }}
          onPress={handleMiniPlayerPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
