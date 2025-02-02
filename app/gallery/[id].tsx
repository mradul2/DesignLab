import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const imageData = [
  {
    id: '1',
    image: require('@/assets/images/incident1.png'),
    timestamp: new Date('2024-03-15T14:30:00'),
    camera: 'Entrance'
  },
  {
    id: '2',
    image: require('@/assets/images/incident2.png'),
    timestamp: new Date('2024-03-15T15:45:00'),
    camera: 'Parking'
  },
  {
    id: '3',
    image: require('@/assets/images/incident3.png'),
    timestamp: new Date('2024-03-14T09:15:00'),
    camera: 'Lobby'
  },
];

export default function ImageDetailScreen() {
  const { id } = useLocalSearchParams();
  const image = imageData.find(img => img.id === id);

  if (!image) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Image not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={image.image} style={styles.image} />
      <ThemedView style={styles.metaContainer}>
        <ThemedText style={styles.metaText}>
          Date: {image.timestamp.toLocaleDateString()}
        </ThemedText>
        <ThemedText style={styles.metaText}>
          Time: {image.timestamp.toLocaleTimeString()}
        </ThemedText>
        <ThemedText style={styles.metaText}>
          Camera: {image.camera}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },
  metaContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
  },
  metaText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
});