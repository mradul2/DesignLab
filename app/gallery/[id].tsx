import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';

type ImageData = {
  id: string;
  url: string;
  timestamp: string;
  camera: string;
};

export default function ImageDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [image, setImage] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    Alert.alert(
      'Delete Image',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: async () => {
            try {
              await fetch(`http://192.168.0.121:3000/api/gallery/${id}`, {
                method: 'DELETE'
              });
              router.back();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete image');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('http://192.168.0.121:3000/api/gallery');
        const images = await response.json();
        const foundImage = images.find((img: ImageData) => img.id === id);
        setImage(foundImage || null);
      } catch (error) {
        console.error('Failed to fetch image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </ThemedView>
    );
  }

  if (!image) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Image not found</ThemedText>
      </ThemedView>
    );
  }

  const timestamp = new Date(image.timestamp);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image.url }} style={styles.image} />
      <ThemedView style={styles.metaContainer}>
        <ThemedText style={styles.metaText}>
          Date: {timestamp.toLocaleDateString()}
        </ThemedText>
        <ThemedText style={styles.metaText}>
          Time: {timestamp.toLocaleTimeString()}
        </ThemedText>
        <ThemedText style={styles.metaText}>
          Camera: {image.camera}
        </ThemedText>
      </ThemedView>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <ThemedText style={styles.deleteButtonText}>Delete Image</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
    marginBottom: 20,
  },
  metaText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4757',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
