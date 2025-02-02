import { StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const dummyCameras = [
  { id: '1', name: 'Entrance', url: 'xjQzg1QAlXs' }, // YouTube video IDs 
  { id: '2', name: 'Parking Lot', url: 'JOKBzzpoWnU' },
  { id: '3', name: 'Lobby', url: '2bM9e9FLr_g' },
  { id: '4', name: 'Backyard', url: 'NtuKgCMqssY' },
];

export default function CameraFeedsScreen() {
  return (
    <FlatList
      data={dummyCameras}
      numColumns={2}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Link href={`/camera-feed/${item.url}`} asChild>
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: `https://img.youtube.com/vi/${item.url}/hqdefault.jpg` }}
              style={styles.thumbnail}
            />
            <ThemedText style={styles.cameraName}>{item.name}</ThemedText>
          </TouchableOpacity>
        </Link>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
  },
  cameraName: {
    padding: 8,
    textAlign: 'center',
    fontSize: 14,
  },
});