import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function CameraFeedScreen() {
  const { videoId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play
        videoId={videoId as string}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});