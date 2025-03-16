import { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
// import Video from 'react-native-video';
import { useLocalSearchParams } from 'expo-router';

export default function CameraFeedScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStream = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.121:3000/api/streams/${id}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data); 
        console.log("API Response:", id); 

        // print(data) 
        
        if (!data?.hlsUrl) {
          throw new Error('No HLS stream URL found in response');
        }
        
        setStreamUrl(data.hlsUrl);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stream');
        setStreamUrl(null);
      } finally {
        setLoading(false);
      }
    };

    loadStream();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!streamUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No stream URL available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: streamUrl }}
        style={styles.video}
        useNativeControls={false}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.CONTAIN}
        rate={1.0}
        onError={(error) => {
          console.error('Video playback error:', error);
          console.error('Debug:', streamUrl);
          setError('Failed to play video stream');
        }}
      />

      {/* <Video
        source={{ uri: streamUrl }}
        resizeMode="cover"
        hardwareAccelerated={false}  // Disable MediaTek decoder
        onError={(e) => console.log('Player error:', e.error)}
      /> */}
    </View>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});